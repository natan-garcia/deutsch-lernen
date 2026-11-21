using DeutschLernen.Api.Content;

namespace DeutschLernen.Api.Tests;

public class ResourcePackageReaderTests : IDisposable
{
    private readonly string _dir = Directory.CreateTempSubdirectory("pkg-").FullName;

    [Fact]
    public async Task Rejects_packages_from_a_newer_schema_version()
    {
        await File.WriteAllTextAsync(Path.Combine(_dir, "manifest.json"),
            """{ "schemaVersion": 99, "id": "future", "name": "Future", "language": "de" }""");

        var error = await Assert.ThrowsAsync<InvalidDataException>(() => ResourcePackageReader.ReadAsync(_dir));
        Assert.Contains("schema version 99", error.Message);
    }

    [Fact]
    public async Task Rejects_items_with_an_unknown_variant()
    {
        await File.WriteAllTextAsync(Path.Combine(_dir, "manifest.json"),
            """{ "schemaVersion": 1, "id": "bad", "name": "Bad", "language": "de", "files": { "vocabulary": "v.json" } }""");
        await File.WriteAllTextAsync(Path.Combine(_dir, "v.json"),
            """[{ "id": "x", "level": "A1", "variant": "de-AT", "lemma": "Paradeiser", "partOfSpeech": "noun", "translations": { "es": "tomate" } }]""");

        var error = await Assert.ThrowsAsync<InvalidDataException>(() => ResourcePackageReader.ReadAsync(_dir));
        Assert.Contains("de-AT", error.Message);
    }

    public void Dispose() => Directory.Delete(_dir, recursive: true);
}
