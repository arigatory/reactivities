using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly DataContext _context;

    public ActivitiesController(DataContext context)
    {
        if (context == null || context.Activities == null)
        {
            throw new ArgumentNullException(nameof(context));
        }
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _context.Activities.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var activity = await _context.Activities.FindAsync(id);
        if (activity == null)
            return NotFound();
        return Ok(activity);
    }
}