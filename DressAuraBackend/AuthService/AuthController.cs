using DressAuraBackend.AuthService.DTOs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DressAuraBackend.AuthService
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            var redirectUrl = Url.Action("GoogleCallback", "Auth", null, Request.Scheme);
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);  // Redirects user to Google
        }

        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleCallback()
        {
            var authenticateResult = await HttpContext.AuthenticateAsync("Cookies");

            if (!authenticateResult.Succeeded)
            {
                return Unauthorized();
            }

            var claims = authenticateResult.Principal.Identity as ClaimsIdentity;
            var email = claims?.FindFirst(ClaimTypes.Email)?.Value;
            var accessToken = authenticateResult.Properties.GetTokenValue("access_token");
            if (email == null)
            {
                return Redirect("http://localhost:5173/login");
            }

            await authService.GoogleSignIn(email);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            };
            Response.Cookies.Append("access_token", accessToken, cookieOptions);

            return Redirect("http://localhost:5173");
        }

        [Authorize]
        [HttpGet("is-logged-in")]
        public async Task<IActionResult> IsLoggedIn()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (email == null)
            {
                return Unauthorized();
            }

            var user = await authService.GetUserByEmail(email);
            return Ok(user);
        }

        [Authorize]
        [HttpGet("account")]
        public async Task<IActionResult> GetAccount()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (email == null)
            {
                return Unauthorized();
            }

            var user = await authService.GetUserByEmail(email);
            return Ok(user);
        }

        [Authorize]
        [HttpPut("register")]
        public async Task<IActionResult> RegisterUser(UserRegisterDTO userData)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (email == null)
            {
                return Unauthorized();
            }

            var user = await authService.GetUserByEmail(email);
            if (user == null)
            {
                return BadRequest("No user found.");
            }

            user = await authService.RegisterUser(user, userData);

            return Ok(user);
        }

        [Authorize]
        [HttpPut("personal-details")]
        public async Task<IActionResult> UpdatePersonalDetails(UserUpdatePersonalDetailsDTO userData)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (email == null)
            {
                return Unauthorized();
            }

            var user = await authService.GetUserByEmail(email);
            if (user == null)
            {
                return BadRequest("No user found.");
            }

            user = await authService.UpdatePersonalDetails(user, userData);

            return Ok(user);
        }
    }
}