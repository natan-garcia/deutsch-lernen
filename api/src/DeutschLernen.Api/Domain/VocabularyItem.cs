namespace DeutschLernen.Api.Domain;

/// <summary>A word or phrase. Mirrors VocabularyItem in content/schema/vocabulary.schema.json.</summary>
public class VocabularyItem
{
    public required string Id { get; set; }
    public required string Level { get; set; }
    public required string Variant { get; set; }
    /// <summary>For a regional variant, the id of the standard item it replaces.</summary>
    public string? VariantOf { get; set; }
    public required string Lemma { get; set; }
    public string? Gender { get; set; }
    public string? Plural { get; set; }
    public required string PartOfSpeech { get; set; }
    public Dictionary<string, string> Translations { get; set; } = [];
    public Example? Example { get; set; }
    public List<string> Tags { get; set; } = [];
    public Source? Source { get; set; }

    /// <summary>Package the item came from, so a package can be removed or updated as a whole.</summary>
    public required string PackageId { get; set; }
    /// <summary>Position inside its package, to keep the author's order.</summary>
    public int SortOrder { get; set; }
}

public class Example
{
    public required string De { get; set; }
    public string? Translation { get; set; }
}

public class Source
{
    public string? Url { get; set; }
    public string? License { get; set; }
}
