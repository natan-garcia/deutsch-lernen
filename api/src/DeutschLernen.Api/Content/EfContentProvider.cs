using DeutschLernen.Api.Data;
using DeutschLernen.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace DeutschLernen.Api.Content;

public class EfContentProvider(AppDbContext db) : IContentProvider
{
    public async Task<IReadOnlyList<VocabularyItem>> GetVocabularyAsync(string level, string variant, CancellationToken ct = default)
    {
        var items = await db.Vocabulary.AsNoTracking()
            .Where(i => i.Level == level)
            .OrderBy(i => i.PackageId).ThenBy(i => i.SortOrder)
            .ToListAsync(ct);
        return VariantResolver.Resolve(items, variant);
    }
}
