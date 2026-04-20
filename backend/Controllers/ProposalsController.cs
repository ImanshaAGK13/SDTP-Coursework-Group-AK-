using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProposalsController : ControllerBase
{
    private readonly IProposalService _proposalService;
    private readonly IMatchingService _matchingService;
    private readonly IWebHostEnvironment _environment;

    public ProposalsController(IProposalService proposalService, IMatchingService matchingService, IWebHostEnvironment environment)
    {
        _proposalService = proposalService;
        _matchingService = matchingService;
        _environment = environment;
    }

    // GET: api/Proposals (Filtered by Role)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetProposals()
    {
        var role = User.FindFirstValue(ClaimTypes.Role) ?? "";
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

        var results = await _proposalService.GetProposalsAsync(userId, role);
        return Ok(results);
    }

    // POST: api/Proposals (Submission with PDF)
    [HttpPost]
    public async Task<IActionResult> CreateProposal([FromForm] ProposalSubmissionDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

        string? filePath = null;
        if (dto.File != null)
        {
            var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads");
            if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
            
            var uniqueName = Guid.NewGuid().ToString() + "_" + dto.File.FileName;
            filePath = Path.Combine("uploads", uniqueName);
            var fullPath = Path.Combine(uploads, uniqueName);

            using var fileStream = new FileStream(fullPath, FileMode.Create);
            await dto.File.CopyToAsync(fileStream);
        }

        var proposal = new Proposal
        {
            Title = dto.Title,
            Abstract = dto.Abstract,
            TechStack = dto.TechStack,
            ResearchArea = dto.ResearchArea,
            ProjectType = dto.ProjectType,
            StudentId = userId,
            FilePath = filePath,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        var created = await _proposalService.CreateAsync(proposal);
        return Ok(created);
    }

    // PATCH: api/Proposals/{id}/match
    [HttpPatch("{id}/match")]
    [Authorize(Roles = "Supervisor,Module Leader")]
    public async Task<IActionResult> MatchProposal(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
        var userName = User.FindFirstValue(ClaimTypes.Name) ?? "Unknown User";

        var success = await _matchingService.MatchProposalAsync(id, userId, userName);
        if (!success) return BadRequest("Unable to match proposal.");

        return Ok(new { message = "Proposal successfully matched." });
    }

    // PATCH: api/Proposals/{id}/reassign (Module Leader Intervention)
    [HttpPatch("{id}/reassign")]
    [Authorize(Roles = "Module Leader")]
    public async Task<IActionResult> ReassignProposal(int id, [FromBody] int targetSupervisorId)
    {
        var adminName = User.FindFirstValue(ClaimTypes.Name) ?? "Admin";

        var success = await _matchingService.ReassignProposalAsync(id, targetSupervisorId, adminName);
        if (!success) return BadRequest("Unable to reassign proposal.");

        return Ok(new { message = "Proposal reassigned successfully." });
    }

    // GET: api/Proposals/{id}/suggestions
    [HttpGet("{id}/suggestions")]
    [Authorize(Roles = "Module Leader")]
    public async Task<IActionResult> GetSuggestions(int id)
    {
        var suggestions = await _matchingService.GetBlindMatchSuggestionsAsync(id);
        return Ok(suggestions);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProposal(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
        var userName = User.FindFirstValue(ClaimTypes.Name) ?? "Unknown User";
        var role = User.FindFirstValue(ClaimTypes.Role) ?? "";

        await _proposalService.DeleteAsync(id, userName, role, userId);
        return NoContent();
    }

    // PUT: api/Proposals/{id} (Edit)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProposal(int id, [FromForm] ProposalUpdateDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
        var proposal = await _proposalService.GetByIdAsync(id);

        if (proposal == null) return NotFound();
        if (proposal.StudentId != userId) return Forbid();
        if (proposal.Status == "Matched") return BadRequest("Cannot edit a matched proposal.");

        proposal.Title = dto.Title;
        proposal.Abstract = dto.Abstract;
        proposal.TechStack = dto.TechStack;
        proposal.ResearchArea = dto.ResearchArea;
        proposal.ProjectType = dto.ProjectType;

        if (dto.File != null)
        {
            var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads");
            if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
            var uniqueName = Guid.NewGuid().ToString() + "_" + dto.File.FileName;
            proposal.FilePath = Path.Combine("uploads", uniqueName);
            var fullPath = Path.Combine(uploads, uniqueName);
            using var fileStream = new FileStream(fullPath, FileMode.Create);
            await dto.File.CopyToAsync(fileStream);
        }

        await _proposalService.UpdateAsync(proposal);
        return Ok(proposal);
    }
}

public class ProposalSubmissionDto
{
    public string Title { get; set; } = string.Empty;
    public string Abstract { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public string ResearchArea { get; set; } = string.Empty;
    public string ProjectType { get; set; } = "Individual";
    public IFormFile? File { get; set; }
}

public class ProposalUpdateDto
{
    public string Title { get; set; } = string.Empty;
    public string Abstract { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public string ResearchArea { get; set; } = string.Empty;
    public string ProjectType { get; set; } = "Individual";
    public IFormFile? File { get; set; }
}

