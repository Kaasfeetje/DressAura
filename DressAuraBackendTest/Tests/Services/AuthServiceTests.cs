using DressAuraBackend.Models;
using DressAuraBackend.Models.DTOs;
using DressAuraBackend.Services;
using DressAuraBackend.Data;
using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Threading.Tasks;

namespace DressAuraBackend.Tests.Services
{
    public class AuthServiceTests
    {
        private readonly AuthService _authService;
        private readonly DbContextOptions<ApiContext> _contextOptions;

        public AuthServiceTests()
        {
            // Setup in-memory database options
            _contextOptions = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase(databaseName: "DressAuraTestDb")
                .Options;

            // Create a new instance of ApiContext using the in-memory database
            var context = new ApiContext(_contextOptions);

            // Ensure database is created
            context.Database.EnsureCreated();

            // Create an instance of the service you're testing
            _authService = new AuthService(context);
        }

        [Fact]
        public async Task RegisterUser_ShouldUpdateUser_WhenUserExists()
        {
            // Arrange
            var user = new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                Email = "test@example.com",
                IsRegistered = true
            };

            var userData = new UserRegisterDTO
            {
                FirstName = "Jane",
                LastName = "Smith",
                ProfilePictureUrl = "http://example.com/profile.jpg"
            };

            // Add the user to the in-memory database
            using (var context = new ApiContext(_contextOptions))
            {
                context.Users.Add(user);
                await context.SaveChangesAsync();
            }

            // Act - Update the user
            User result;
            using (var context = new ApiContext(_contextOptions))
            {
                result = await _authService.RegisterUser(user, userData);
            }

            // Assert - Ensure that the user's details were updated correctly
            Assert.NotNull(result);
            Assert.Equal("Jane", result.FirstName);
            Assert.Equal("Smith", result.LastName);
            Assert.Equal("http://example.com/profile.jpg", result.ProfilePictureUrl);
            Assert.True(result.IsRegistered);  // Ensure the user is registered
        }

        [Fact]
        public async Task RegisterUser_ShouldNotCreateUser_WhenUserDoesNotExist()
        {
            // Arrange
            var user = new User
            {
                Id = 1,  // This ID won't be used because the user doesn't exist in the database
                FirstName = "John",
                LastName = "Doe",
                Email = "nonexistent@example.com", // This email does not exist in the database
                IsRegistered = false
            };

            var userData = new UserRegisterDTO
            {
                FirstName = "Jane",
                LastName = "Smith",
                ProfilePictureUrl = "http://example.com/profile.jpg"
            };

            // Ensure the user with the given email does not exist in the database
            User existingUser;
            using (var context = new ApiContext(_contextOptions))
            {
                existingUser = await context.Users
                    .FirstOrDefaultAsync(u => u.Email == "nonexistent@example.com");
                Assert.Null(existingUser); // Ensure the user does not exist
            }

            await _authService.RegisterUser(null, userData); // Assuming the service throws ArgumentException

            // Assert - Ensure that no new user was created
            using (var context = new ApiContext(_contextOptions))
            {
                var userInDb = await context.Users
                    .FirstOrDefaultAsync(u => u.Email == "nonexistent@example.com");
                Assert.Null(userInDb); // Ensure that no new user has been created
            }
        }



    }
}
