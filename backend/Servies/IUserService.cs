using backend.Models;

namespace backend.Services;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User?> GetUserByIdAsync(int id);
    Task<User?> UpdateProfileAsync(int userId, UserUpdateDto dto);
    Task<bool> DeleteUserAsync(int id);
}
