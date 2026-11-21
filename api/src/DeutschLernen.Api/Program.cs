using System.Text.Json.Serialization;
using DeutschLernen.Api.Content;
using DeutschLernen.Api.Data;
using DeutschLernen.Api.Modules.Vocabulary;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
builder.Services.ConfigureHttpJsonOptions(o =>
    o.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull);

builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlite(builder.Configuration.GetConnectionString("Default") ?? "Data Source=deutsch-lernen.db"));
builder.Services.AddScoped<IContentProvider, EfContentProvider>();
builder.Services.AddScoped<ContentSeeder>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    await scope.ServiceProvider.GetRequiredService<ContentSeeder>().SeedAsync();
}

app.MapOpenApi();
app.MapGet("/api/health", () => Results.Ok(new { status = "ok" })).WithTags("System");
app.MapVocabulary();

app.Run();

/// <summary>Exposed for integration tests (WebApplicationFactory).</summary>
public partial class Program;
