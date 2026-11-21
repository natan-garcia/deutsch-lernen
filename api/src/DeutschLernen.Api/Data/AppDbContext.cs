using System.Text.Json;
using DeutschLernen.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DeutschLernen.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<VocabularyItem> Vocabulary => Set<VocabularyItem>();

    protected override void OnModelCreating(ModelBuilder model)
    {
        var item = model.Entity<VocabularyItem>();
        item.ToTable("VocabularyItems");
        item.HasKey(i => i.Id);
        item.HasIndex(i => new { i.Level, i.Variant });
        item.Property(i => i.Translations).HasConversion(JsonConverter<Dictionary<string, string>>(), JsonComparer<Dictionary<string, string>>());
        item.Property(i => i.Tags).HasConversion(JsonConverter<List<string>>(), JsonComparer<List<string>>());
        item.OwnsOne(i => i.Example);
        item.OwnsOne(i => i.Source);
    }

    private static Microsoft.EntityFrameworkCore.Storage.ValueConversion.ValueConverter<T, string> JsonConverter<T>() where T : new() =>
        new(v => JsonSerializer.Serialize(v, JsonSerializerOptions.Web),
            v => JsonSerializer.Deserialize<T>(v, JsonSerializerOptions.Web) ?? new T());

    private static ValueComparer<T> JsonComparer<T>() where T : new() =>
        new((a, b) => JsonSerializer.Serialize(a, JsonSerializerOptions.Web) == JsonSerializer.Serialize(b, JsonSerializerOptions.Web),
            v => JsonSerializer.Serialize(v, JsonSerializerOptions.Web).GetHashCode(),
            v => JsonSerializer.Deserialize<T>(JsonSerializer.Serialize(v, JsonSerializerOptions.Web), JsonSerializerOptions.Web) ?? new T());
}
