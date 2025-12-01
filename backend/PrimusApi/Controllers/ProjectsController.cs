using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrimusApi.Models;

namespace PrimusApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectDetails(int id)
        {
            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Project_Id == id);

            if (project == null)
                return NotFound(new { message = "Project not found" });

            var intern = await _context.Interns
                .FirstOrDefaultAsync(i => i.Intern_Id == project.Owner_Id);

            var evaluations = await _context.Evaluations
                .Where(e => e.Project_Id == id)
                .ToListAsync();

            return Ok(new { Project = project, Intern = intern, Evaluations = evaluations });
        }
    }
}
