namespace backend.Models;

public class ResearchArea
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty; // AI, Cybersecurity, etc.
    public string Description { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
