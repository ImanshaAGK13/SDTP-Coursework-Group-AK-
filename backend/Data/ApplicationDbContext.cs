using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Proposal> Proposals { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<ResearchArea> ResearchAreas { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }
}
