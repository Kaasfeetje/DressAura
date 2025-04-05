using Microsoft.EntityFrameworkCore;
using DressAuraBackend.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Text.Json;
using DressAuraBackend.AuthService;
using DressAuraBackend.ProductService.Mappings;
using DressAuraBackend.ProductService;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.OAuth;
using DressAuraBackend.AuthService.Models;
using DressAuraBackend.CategoryService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ApiContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services for OpenAPI/Swagger
builder.Services.AddEndpointsApiExplorer();  // Automatically adds OpenAPI support
builder.Services.AddSwaggerGen();  // Generates Swagger UI


// Add services to the container.
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Cookies";
    // options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
    options.Events = new CookieAuthenticationEvents
    {
        OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/json";
            var result = JsonSerializer.Serialize(new { message = "Unauthorized" });
            return context.Response.WriteAsync(result);
        },
        OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = 403;
            context.Response.ContentType = "application/json";
            var result = JsonSerializer.Serialize(new { message = "Forbidden" });
            return context.Response.WriteAsync(result);
        }
    };
})

.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Authorization:Google:ClientId"];
    options.ClientSecret = builder.Configuration["Authorization:Google:ClientSecret"];
    options.CallbackPath = "/signin-google";  // Google will redirect here after successful login
    options.Scope.Add("email"); // Optional: Add additional scopes like email or profile
    options.SaveTokens = true;  // Save the tokens for use later

    // New
    options.Events = new OAuthEvents
    {
        OnTicketReceived = async context =>
        {
            // Assuming you have a way to determine if the user is an admin
            // This could come from your database or a custom logic
            var email = context.Principal.FindFirst(ClaimTypes.Email)?.Value;
            if (email != null)
            {
                // Example: Check your user database (pseudo-code)
                // Replace with your actual user service/repository
                var authService = context.HttpContext.RequestServices.GetRequiredService<IAuthService>();
                var user = await authService.GetUserByEmail(email);

                if (user != null)
                {
                    var identity = (ClaimsIdentity)context.Principal.Identity;
                    identity.AddClaim(new Claim(ClaimTypes.Role, user.Role)); // Add role claim
                }
            }
        }
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole(UserRoles.Admin));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy => policy.WithOrigins("http://localhost:5173") // Replace with your frontend URL
            .AllowCredentials() // Allow credentials (cookies, HTTP authentication)
            .AllowAnyHeader()  // Allow any header
            .AllowAnyMethod()); // Allow any HTTP method (GET, POST, etc.)
});

builder.Services.AddControllers();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoriesService, CategoriesService>();

builder.Services.AddAutoMapper(typeof(ProductProfile));

var app = builder.Build();

// app.UseMiddleware<RequestLoggingMiddleware>();

DbSeeder.Seed(app.Services, app.Environment);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // Enable Swagger
    app.UseSwaggerUI();  // Enable Swagger UI
}

app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
