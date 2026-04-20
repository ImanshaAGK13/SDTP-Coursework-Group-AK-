using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Proposal
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Abstract { get; set; } = string.Empty;

    [Required]
    public string TechStack { get; set; } = string.Empty;

    [Required]
    public string ResearchArea { get; set; } = string.Empty;

    [Required]
    public string ProjectType { get; set; } = "Individual"; // Individual or Group

    [Required]
    public string Status { get; set; } = "Pending"; // Pending, Under Review, Matched, Rejected
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public int StudentId { get; set; }
    public int? SupervisorId { get; set; }
    public string? FilePath { get; set; } // Path to stored PDF dossier
}
