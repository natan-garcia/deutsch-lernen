using DeutschLernen.Api.Content;
using Microsoft.EntityFrameworkCore;

namespace DeutschLernen.Api.Data;

/// <summary>
/// Loads the packages shipped in content/packages into an empty database.
/// After that the database belongs to the user: their edits are never overwritten.
/// </summary>
public class ContentSeeder(AppDbContext db, IConfiguration config, IHostEnvironment env, ILogger<ContentSeeder> logger)
{
    public async Task SeedAsync(CancellationToken ct = default)
    {
        await db.Database.EnsureCreatedAsync(ct);
        if (await db.Vocabulary.AnyAsync(ct)) return;

        var packagesDir = Path.GetFullPath(config["Content:PackagesPath"] ?? "../../../content/packages", env.ContentRootPath);
        if (!Directory.Exists(packagesDir))
        {
            logger.LogWarning("No content packages found at {Path}", packagesDir);
            return;
        }

        foreach (var dir in Directory.GetDirectories(packagesDir).Order())
        {
            var package = await ResourcePackageReader.ReadAsync(dir, ct);
            db.Vocabulary.AddRange(package.Vocabulary);
            logger.LogInformation("Seeded package {Package} ({Count} vocabulary items)", package.Manifest.Id, package.Vocabulary.Count);
        }
        await db.SaveChangesAsync(ct);
    }
}
