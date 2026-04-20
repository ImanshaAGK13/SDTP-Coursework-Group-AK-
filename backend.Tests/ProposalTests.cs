using backend.Controllers;
using backend.Models;
using backend.Services;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace backend.Tests;

public class ProposalTests
{
    [Fact]
    public async Task MatchProposal_ShouldReturnOk_WhenSuccess()
    {
        // ARRANGE: Mocking a Service (Requirement: Mocking/Moq)
        var mockService = new Mock<IProposalService>();
        var mockEnv = new Mock<IWebHostEnvironment>();

        mockService.Setup(s => s.MatchAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>()))
                   .ReturnsAsync(true);

        var controller = new ProposalsController(mockService.Object, mockEnv.Object);
        
        // Mock User Claims for RBAC testing
        var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
            new Claim(ClaimTypes.NameIdentifier, "1"),
            new Claim(ClaimTypes.Name, "Test Supervisor"),
            new Claim(ClaimTypes.Role, "Supervisor")
        }, "mock"));

        controller.ControllerContext = new ControllerContext() {
            HttpContext = new DefaultHttpContext() { User = user }
        };

        // ACT
        var result = await controller.MatchProposal(1);

        // ASSERT
        result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task CreateProposal_ShouldPersistData_WithInMemoryDb()
    {
        // ARRANGE: Integration Testing with InMemory Database (Requirement: Integration Testing)
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_" + Guid.NewGuid().ToString())
            .Options;

        using (var context = new ApplicationDbContext(options))
        {
            var service = new ProposalService(context);
            var proposal = new Proposal { Title = "Test AI Project", Abstract = "Abstract...", TechStack = "Python", ResearchArea = "AI" };

            // ACT
            await service.CreateAsync(proposal);
        }

        // ASSERT
        using (var context = new ApplicationDbContext(options))
        {
            var count = await context.Proposals.CountAsync();
            count.Should().Be(1);
            
            var saved = await context.Proposals.FirstAsync();
            saved.Title.Should().Be("Test AI Project");
        }
    }
}
