using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrimusApi.Models;

namespace PrimusApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvaluationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/evaluations/evaluators
        // Returns distinct evaluator names for populating dropdowns
        [HttpGet("evaluators")]
        public async Task<IActionResult> GetEvaluators()
        {
            var names = await _context.Evaluations
                .Where(e => !string.IsNullOrEmpty(e.Evaluator))
                .Select(e => e.Evaluator)
                .Distinct()
                .OrderBy(n => n)
                .ToListAsync();

            return Ok(names);
        }

        // GET: /api/evaluations/filterByScore?min=5&max=9
        // Returns list of objects containing project + intern + evaluation for evaluations with score in range
        [HttpGet("filterByScore")]
        public async Task<IActionResult> FilterByScore(int? min = null, int? max = null)
        {
            int minScore = min ?? int.MinValue;
            int maxScore = max ?? int.MaxValue;

            var query = _context.Evaluations
                .Where(e => e.Score >= minScore && e.Score <= maxScore);

            var results = await query
                .Join(_context.Projects,
                      e => e.Project_Id,
                      p => p.Project_Id,
                      (e, p) => new { e, p })
                .Join(_context.Interns,
                      ep => ep.p.Owner_Id,
                      i => i.Intern_Id,
                      (ep, i) => new
                      {
                          project = ep.p,
                          intern = i,
                          evaluation = ep.e
                      })
                .ToListAsync();

            var dto = results.Select(r => new
            {
                project = new
                {
                    project_Id = r.project.Project_Id,
                    title = r.project.Title,
                    tech_Stack = r.project.Tech_Stack,
                    description = r.project.Description,
                    start_date = r.project.Start_Date,
                    end_date = r.project.End_Date,
                    owner_id = r.project.Owner_Id
                },
                intern = new
                {
                    intern_Id = r.intern.Intern_Id,
                    first_Name = r.intern.First_Name,
                    last_Name = r.intern.Last_Name,
                    email = r.intern.Email,
                    phone = r.intern.Phone,
                    degree = r.intern.Degree,
                    university = r.intern.University,
                    year_Graduation = r.intern.Year_Graduation
                },
                score = r.evaluation.Score,
                feedback = r.evaluation.Feedback,
                evaluator = r.evaluation.Evaluator
            });

            return Ok(dto);
        }

        // GET: /api/evaluations/filterByEvaluator?name=John
        // Returns list of objects containing project + intern + evaluation for evaluations done by evaluator name
        [HttpGet("filterByEvaluator")]
        public async Task<IActionResult> FilterByEvaluator([FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return BadRequest("Evaluator name required.");

            var query = _context.Evaluations
                .Where(e => e.Evaluator.ToLower().Contains(name.ToLower()));

            var results = await query
                .Join(_context.Projects,
                      e => e.Project_Id,
                      p => p.Project_Id,
                      (e, p) => new { e, p })
                .Join(_context.Interns,
                      ep => ep.p.Owner_Id,
                      i => i.Intern_Id,
                      (ep, i) => new
                      {
                          project = ep.p,
                          intern = i,
                          evaluation = ep.e
                      })
                .ToListAsync();

            var dto = results.Select(r => new
            {
                project = new
                {
                    project_Id = r.project.Project_Id,
                    title = r.project.Title,
                    tech_Stack = r.project.Tech_Stack,
                    description = r.project.Description,
                    start_date = r.project.Start_Date,
                    end_date = r.project.End_Date,
                    owner_id = r.project.Owner_Id
                },
                intern = new
                {
                    intern_Id = r.intern.Intern_Id,
                    first_Name = r.intern.First_Name,
                    last_Name = r.intern.Last_Name,
                    email = r.intern.Email,
                    phone = r.intern.Phone,
                    degree = r.intern.Degree,
                    university = r.intern.University,
                    year_Graduation = r.intern.Year_Graduation
                },
                score = r.evaluation.Score,
                feedback = r.evaluation.Feedback,
                evaluator = r.evaluation.Evaluator
            });

            return Ok(dto);
        }
    }
}
