using Microsoft.EntityFrameworkCore;
using DressAuraBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ApiContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services for OpenAPI/Swagger
builder.Services.AddEndpointsApiExplorer();  // Automatically adds OpenAPI support
builder.Services.AddSwaggerGen();  // Generates Swagger UI

builder.Services.AddControllers();

var app = builder.Build();

DbSeeder.Seed(app.Services, app.Environment);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // Enable Swagger
    app.UseSwaggerUI();  // Enable Swagger UI
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
