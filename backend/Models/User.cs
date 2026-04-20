using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    [RegularExpression(@"^[a-zA-Z0-9._%+-]+@pas\.com$", ErrorMessage = "Only institutional emails (@pas.com) are allowed.")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = string.Empty; // Student, Supervisor, Module Leader

    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^(ST|SV|ML)-\d{4}$", ErrorMessage = "Institutional ID must be in format ST-1234, SV-1234, or ML-1234")]
    public string InstitutionalId { get; set; } = string.Empty; 

    public string? Expertise { get; set; } // For Supervisors: comma-separated areas
}
