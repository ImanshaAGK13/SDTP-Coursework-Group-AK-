using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ResearchAreasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ResearchAreasController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ResearchArea>>> GetAreas()
    {
        return await _context.ResearchAreas.ToListAsync();
    }

    [HttpPost]
    [Authorize(Roles = "Module Leader")]
    public async Task<ActionResult<ResearchArea>> CreateArea(ResearchArea area)
    {
        _context.ResearchAreas.Add(area);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAreas), new { id = area.Id }, area);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Module Leader")]
    public async Task<IActionResult> DeleteArea(int id)
    {
        var area = await _context.ResearchAreas.FindAsync(id);
        if (area == null) return NotFound();

        _context.ResearchAreas.Remove(area);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
