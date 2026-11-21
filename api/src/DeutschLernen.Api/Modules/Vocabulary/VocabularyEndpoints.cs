using DeutschLernen.Api.Content;
using DeutschLernen.Api.Domain;

namespace DeutschLernen.Api.Modules.Vocabulary;

public static class VocabularyEndpoints
{
    public static IEndpointRouteBuilder MapVocabulary(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/vocabulary", async (IContentProvider content, CancellationToken ct, string level = "A1", string variant = LanguageVariant.StandardGerman) =>
        {
            if (!CefrLevel.IsKnown(level))
                return Results.ValidationProblem(new Dictionary<string, string[]> { ["level"] = [$"Unknown level '{level}'."] });
            if (!LanguageVariant.IsKnown(variant))
                return Results.ValidationProblem(new Dictionary<string, string[]> { ["variant"] = [$"Unknown variant '{variant}'."] });

            var items = await content.GetVocabularyAsync(level, variant, ct);
            return Results.Ok(items.Select(VocabularyItemResponse.From));
        })
        .WithName("GetVocabulary")
        .WithTags("Vocabulary");

        return app;
    }
}

/// <summary>Public shape of a vocabulary item (same as the JSON format, without storage fields).</summary>
public record VocabularyItemResponse(
    string Id, string Level, string Variant, string? VariantOf, string Lemma, string? Gender, string? Plural,
    string PartOfSpeech, IReadOnlyDictionary<string, string> Translations, Example? Example,
    IReadOnlyList<string> Tags, Source? Source)
{
    public static VocabularyItemResponse From(VocabularyItem i) => new(
        i.Id, i.Level, i.Variant, i.VariantOf, i.Lemma, i.Gender, i.Plural, i.PartOfSpeech,
        i.Translations, i.Example, i.Tags, i.Source);
}
