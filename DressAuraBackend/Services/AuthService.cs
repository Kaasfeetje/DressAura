
using DressAuraBackend.Data;
using DressAuraBackend.Models;
using DressAuraBackend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DressAuraBackend.Services
{
    public interface IAuthService
    {
        Task<User> GetUserByEmail(string email);
        Task CreateUser(User user);
        Task UpdateUser(User user);
        Task GoogleSignIn(string email);
        bool EmailExists(string email);
        Task<User> RegisterUser(User user, UserRegisterDTO userData);
    }

    public class AuthService : IAuthService
    {
        private readonly ApiContext _context;

        public AuthService(ApiContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task GoogleSignIn(string email)
        {
            var user = await GetUserByEmail(email);

            if (user == null)
            {
                user = new User
                {
                    Email = email
                };
                await CreateUser(user);
            }
            return;
        }

        public bool EmailExists(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }

        public async Task<User> RegisterUser(User user, UserRegisterDTO userData)
        {
            if (user == null)
            {
                Console.Out.WriteLine("REEEE");
                return user;
            }

            user.FirstName = userData.FirstName;
            user.LastName = userData.LastName;
            if (userData.ProfilePictureUrl != null)
            {
                user.ProfilePictureUrl = userData.ProfilePictureUrl;
            }
            user.IsRegistered = true;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }

}