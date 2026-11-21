using DeutschLernen.Api.Domain;

namespace DeutschLernen.Api.Content;

/// <summary>
/// Picks the items to show for a variant: its own items, plus standard German items
/// that have no regional replacement.
/// </summary>
public static class VariantResolver
{
    public static IReadOnlyList<VocabularyItem> Resolve(IEnumerable<VocabularyItem> items, string variant)
    {
        var list = items.ToList();
        if (variant == LanguageVariant.StandardGerman)
            return list.Where(i => i.Variant == LanguageVariant.StandardGerman).ToList();

        var regional = list.Where(i => i.Variant == variant).ToList();
        var replaced = regional.Where(i => i.VariantOf is not null).Select(i => i.VariantOf!).ToHashSet();

        return list
            .Where(i => i.Variant == LanguageVariant.StandardGerman && !replaced.Contains(i.Id))
            .Concat(regional)
            .OrderBy(i => i.PackageId).ThenBy(i => i.VariantOf is null ? i.SortOrder : SortOrderOf(list, i.VariantOf))
            .ToList();
    }

    private static int SortOrderOf(List<VocabularyItem> items, string id) =>
        items.FirstOrDefault(i => i.Id == id)?.SortOrder ?? int.MaxValue;
}
