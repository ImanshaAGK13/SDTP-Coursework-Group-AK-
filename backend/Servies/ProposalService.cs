using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ProposalService : IProposalService
{
    private readonly ApplicationDbContext _context;
    private readonly IAuditLogService _auditLogService;

    public ProposalService(ApplicationDbContext context, IAuditLogService auditLogService)
    {
        _context = context;
        _auditLogService = auditLogService;
    }

    public async Task<IEnumerable<object>> GetProposalsAsync(int userId, string role)
    {
        if (role == "Student")
        {
            return await _context.Proposals
                .Where(p => p.StudentId == userId)
                .ToListAsync();
        }

        if (role == "Supervisor")
        {
            return await _context.Proposals
                .Where(p => p.Status == "Pending" || p.SupervisorId == userId)
                .Select(p => new {
                    p.Id,
                    p.Title,
                    p.Abstract,
                    p.TechStack,
                    p.ResearchArea,
                    p.ProjectType,
                    p.Status,
                    p.CreatedAt,
                    StudentId = p.Status == "Matched" ? p.StudentId : 0
                })
                .ToListAsync();
        }

        return await _context.Proposals.ToListAsync();
    }

    public async Task<Proposal?> GetByIdAsync(int id)
    {
        return await _context.Proposals.FindAsync(id);
    }

    public async Task<Proposal> CreateAsync(Proposal proposal)
    {
        _context.Proposals.Add(proposal);
        await _context.SaveChangesAsync();
        return proposal;
    }


    public async Task UpdateAsync(Proposal proposal)
    {
        _context.Entry(proposal).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id, string userName, string role, int userId)
    {
        var proposal = await _context.Proposals.FindAsync(id);
        if (proposal == null) return;
        
        if (role != "Module Leader" && proposal.StudentId != userId) return;

        _context.Proposals.Remove(proposal);
        
        await _auditLogService.LogActionAsync(
            userName, 
            "Proposal Deleted", 
            $"Project ID {id} ('{proposal.Title}') was removed by {userName}."
        );

        await _context.SaveChangesAsync();
    }
}
