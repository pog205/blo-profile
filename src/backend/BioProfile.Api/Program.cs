
using BioProfile.Api.Endpoints;
using BioProfile.Application;
using BioProfile.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// --- 1. ĐĂNG KÝ SERVICES (Trước khi builder.Build) ---

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// Cấu hình CORS (Phải nằm ở đây!)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        // ... (giữ nguyên code JWT của bạn)
    });

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    // ... (giữ nguyên code Swagger của bạn)
});

// --- 2. BUILD APP ---
var app = builder.Build();

// --- 3. CẤU HÌNH MIDDLEWARE (Sử dụng app.Use...) ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "BioProfile API v1");
        options.RoutePrefix = "swagger";
    });
}

// THỨ TỰ QUAN TRỌNG: CORS phải nằm trước Auth và sau Swagger
app.UseCors("AllowFrontend");

// app.UseHttpsRedirection(); // Tạm tắt để tránh lỗi Redirect Preflight ở máy local

app.UseAuthentication();
app.UseAuthorization();

// Map endpoints
app.MapAuthEndpoints();
app.MapBioProfileEndpoints();
app.MapSocialLinkEndpoints();

app.Run();