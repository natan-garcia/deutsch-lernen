using System.Net;
using System.Net.Http.Json;

namespace DeutschLernen.Api.Tests;

public class VocabularyEndpointTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    private record Item(string Id, string Variant, string Lemma, string? Gender, Dictionary<string, string> Translations);

    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task Standard_german_returns_the_starter_package()
    {
        var items = await _client.GetFromJsonAsync<List<Item>>("/api/vocabulary?level=A1&variant=de-DE");

        Assert.NotNull(items);
        Assert.Equal(24, items.Count);
        Assert.All(items, i => Assert.Equal("de-DE", i.Variant));
        var brot = Assert.Single(items, i => i.Lemma == "Brot");
        Assert.Equal("n", brot.Gender);
        Assert.Equal("pan", brot.Translations["es"]);
    }

    [Fact]
    public async Task Swiss_german_replaces_words_it_has_and_falls_back_to_standard()
    {
        var items = await _client.GetFromJsonAsync<List<Item>>("/api/vocabulary?level=A1&variant=gsw-CH");

        Assert.NotNull(items);
        Assert.Equal(24, items.Count);
        Assert.Contains(items, i => i.Lemma == "Velo");
        Assert.DoesNotContain(items, i => i.Lemma == "Fahrrad");
        Assert.Contains(items, i => i.Lemma == "Brot" && i.Variant == "de-DE");
    }

    [Theory]
    [InlineData("/api/vocabulary?variant=fr-FR")]
    [InlineData("/api/vocabulary?level=Z9")]
    public async Task Unknown_variant_or_level_is_a_bad_request(string url)
    {
        var response = await _client.GetAsync(url);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Health_check_responds()
    {
        var response = await _client.GetAsync("/api/health");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
