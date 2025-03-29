using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DressAuraBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
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

            // You can also get the user's access token and other info from authenticateResult
            var accessToken = authenticateResult.Properties.GetTokenValue("access_token");

            // return Ok(new
            // {
            //     Email = email,
            //     AccessToken = accessToken
            // });

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,   // Prevent client-side access to the cookie (for security)
                Secure = true,     // Only send the cookie over HTTPS
                SameSite = SameSiteMode.Strict,  // Restrict cookie to same site
                Expires = DateTimeOffset.UtcNow.AddHours(1) // Set expiration time
            };

            // You can store the email or access token in a cookie
            Response.Cookies.Append("user_email", email, cookieOptions);
            Response.Cookies.Append("access_token", accessToken, cookieOptions);
            return Redirect("http://localhost:5173");
        }

        [Authorize]
        [HttpGet("is-logged-in")]
        public IActionResult IsLoggedIn()
        {
            return Ok();
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var user = HttpContext.User;
            var email = user?.FindFirst(ClaimTypes.Email)?.Value;
            return Ok(new { email });
        }
    }
}