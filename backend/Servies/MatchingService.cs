using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class MatchingService : IMatchingService
{
    private readonly ApplicationDbContext _context;
    private readonly IAuditLogService _auditLogService;

    public MatchingService(ApplicationDbContext context, IAuditLogService auditLogService)
    {
        _context = context;
        _auditLogService = auditLogService;
    }

    public async Task<bool> MatchProposalAsync(int proposalId, int supervisorId, string userName)
    {
        var proposal = await _context.Proposals.FindAsync(proposalId);
        if (proposal == null || proposal.Status == "Matched") return false;

        proposal.SupervisorId = supervisorId;
        proposal.Status = "Matched";

        await _auditLogService.LogActionAsync(
            userName, 
            "Match Confirmed", 
            $"Supervisor ID {supervisorId} matched with project ID {proposalId} ('{proposal.Title}')."
        );

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ReassignProposalAsync(int proposalId, int supervisorId, string adminName)
    {
        var proposal = await _context.Proposals.FindAsync(proposalId);
        if (proposal == null) return false;

        proposal.SupervisorId = supervisorId;
        proposal.Status = "Matched";

        await _auditLogService.LogActionAsync(
            adminName, 
            "Manual Intervention", 
            $"Admin reassigned project ID {proposalId} to supervisor ID {supervisorId}."
        );

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<User>> GetBlindMatchSuggestionsAsync(int proposalId)
    {
        var proposal = await _context.Proposals.FindAsync(proposalId);
        if (proposal == null) return Enumerable.Empty<User>();

        // Basic matching logic: Find supervisors whose expertise includes the proposal's research area
        var supervisors = await _context.Users
            .Where(u => u.Role == "Supervisor")
            .ToListAsync();

        return supervisors
            .Where(u => !string.IsNullOrEmpty(u.Expertise) && 
                         u.Expertise.Contains(proposal.ResearchArea, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }
}
