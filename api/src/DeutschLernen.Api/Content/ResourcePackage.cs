using System.Text.Json;
using System.Text.Json.Serialization;
using DeutschLernen.Api.Domain;

namespace DeutschLernen.Api.Content;

/// <summary>A resource package as stored on disk: manifest.json plus one file per resource type.</summary>
public record PackageManifest(
    int SchemaVersion,
    string Id,
    string Name,
    string? Description,
    string? Author,
    string? License,
    string Language,
    PackageFiles? Files);

public record PackageFiles(string? Vocabulary);

public record ResourcePackage(PackageManifest Manifest, IReadOnlyList<VocabularyItem> Vocabulary);

public static class ResourcePackageReader
{
    public const int CurrentSchemaVersion = 1;

    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web)
    {
        ReadCommentHandling = JsonCommentHandling.Skip,
        UnmappedMemberHandling = JsonUnmappedMemberHandling.Skip,
    };

    public static async Task<ResourcePackage> ReadAsync(string directory, CancellationToken ct = default)
    {
        var manifest = await ReadJsonAsync<PackageManifest>(Path.Combine(directory, "manifest.json"), ct);
        if (manifest.SchemaVersion > CurrentSchemaVersion)
            throw new InvalidDataException(
                $"Package '{manifest.Id}' uses schema version {manifest.SchemaVersion}; this app supports up to {CurrentSchemaVersion}.");

        var vocabulary = new List<VocabularyItem>();
        if (manifest.Files?.Vocabulary is { } file)
        {
            var raw = await ReadJsonAsync<List<VocabularyItemDto>>(Path.Combine(directory, file), ct);
            vocabulary.AddRange(raw.Select((dto, index) => dto.ToEntity(manifest.Id, index)));
        }

        foreach (var item in vocabulary)
        {
            if (!LanguageVariant.IsKnown(item.Variant))
                throw new InvalidDataException($"Item '{item.Id}' has unknown variant '{item.Variant}'.");
            if (!CefrLevel.IsKnown(item.Level))
                throw new InvalidDataException($"Item '{item.Id}' has unknown level '{item.Level}'.");
        }

        return new ResourcePackage(manifest, vocabulary);
    }

    private static async Task<T> ReadJsonAsync<T>(string path, CancellationToken ct)
    {
        await using var stream = File.OpenRead(path);
        return await JsonSerializer.DeserializeAsync<T>(stream, Json, ct)
            ?? throw new InvalidDataException($"Empty file: {path}");
    }

    private record VocabularyItemDto(
        string Id, string Level, string Variant, string? VariantOf, string Lemma, string? Gender, string? Plural,
        string PartOfSpeech, Dictionary<string, string> Translations, Example? Example, List<string>? Tags, Source? Source)
    {
        public VocabularyItem ToEntity(string packageId, int sortOrder) => new()
        {
            Id = Id, Level = Level, Variant = Variant, VariantOf = VariantOf, Lemma = Lemma, Gender = Gender,
            Plural = Plural, PartOfSpeech = PartOfSpeech, Translations = Translations, Example = Example,
            Tags = Tags ?? [], Source = Source, PackageId = packageId, SortOrder = sortOrder,
        };
    }
}
