using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    // GET: api/Users (Module Leader only)
    [HttpGet]
    [Authorize(Roles = "Module Leader")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    // GET: api/Users/profile
    [HttpGet("profile")]
    public async Task<ActionResult<User>> GetProfile()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
        var user = await _userService.GetUserByIdAsync(userId);

        if (user == null) return NotFound();

        return Ok(user);
    }

    // PATCH: api/Users/profile
    [HttpPatch("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UserUpdateDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
        var user = await _userService.UpdateProfileAsync(userId, dto);

        if (user == null) return NotFound();

        return Ok(user);
    }

    // DELETE: api/Users/{id}
    [HttpDelete("{id}")]
    [Authorize(Roles = "Module Leader")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var success = await _userService.DeleteUserAsync(id);
        if (!success) return NotFound();

        return NoContent();
    }
}

