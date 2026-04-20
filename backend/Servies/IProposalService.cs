using backend.Models;

namespace backend.Services;

public interface IProposalService
{
    Task<IEnumerable<object>> GetProposalsAsync(int userId, string role);
    Task<Proposal?> GetByIdAsync(int id);
    Task<Proposal> CreateAsync(Proposal proposal);
    Task UpdateAsync(Proposal proposal);
    Task DeleteAsync(int id, string userName, string role, int userId);
}
