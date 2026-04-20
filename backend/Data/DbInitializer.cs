using backend.Models;

namespace backend.Data;

public static class DbInitializer
{
    public static void Seed(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();

        if (!context.ResearchAreas.Any())
        {
            context.ResearchAreas.AddRange(new List<ResearchArea>
            {
                new ResearchArea { Name = "Artificial Intelligence", Description = "Neural networks, NLP, and Robotics." },
                new ResearchArea { Name = "Cybersecurity", Description = "Network security and Cryptography." },
                new ResearchArea { Name = "IoT", Description = "Embedded systems and smart sensors." },
                new ResearchArea { Name = "Data Science", Description = "Big data analytics and visualization." }
            });
        }

        if (context.Users.Any())
        {
            context.SaveChanges();
            return;
        }

        var users = new List<User>
        {
            new User
            {
                Email = "student@pas.com",
                Password = "student@123",
                Role = "Student",
                FullName = "Isuru Perera",
                InstitutionalId = "ST-1092"
            },
            new User
            {
                Email = "supervisor@pas.com",
                Password = "super@123",
                Role = "Supervisor",
                FullName = "Dr. Helena Vance",
                InstitutionalId = "SV-5542",
                Expertise = "Artificial Intelligence, Data Science"
            },
            new User
            {
                Email = "leader@pas.com",
                Password = "leader@123",
                Role = "Module Leader",
                FullName = "Prof. Sunimal De Silva",
                InstitutionalId = "ML-001"
            }
        };

        context.Users.AddRange(users);
        context.SaveChanges();
    }
}
