using backend.Models;

namespace backend.Services;

public interface IAuditLogService
{
    Task LogActionAsync(string userId, string action, string details, string status = "Success", string ipAddress = "");
    Task<IEnumerable<AuditLog>> GetLogsAsync(int count = 100);
}
