using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrimusApi.Models;

namespace PrimusApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InternsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInternDetails(int id)
        {
            var intern = await _context.Interns
                .FirstOrDefaultAsync(i => i.Intern_Id == id);

            if (intern == null)
                return NotFound(new { message = "Intern not found" });

            var projects = await _context.Projects
                .Where(p => p.Owner_Id == id)
                .ToListAsync();

            var evaluations = await _context.Evaluations
                .Where(e => e.Intern_Id == id)
                .ToListAsync();

            return Ok(new
            {
                Intern = intern,
                Projects = projects,
                Evaluations = evaluations
            });
        }
    }
}
