using DeutschLernen.Api.Domain;

namespace DeutschLernen.Api.Content;

/// <summary>
/// Read side for learning resources. Endpoints ask for content by level and variant
/// and never know where it is stored.
/// </summary>
public interface IContentProvider
{
    Task<IReadOnlyList<VocabularyItem>> GetVocabularyAsync(string level, string variant, CancellationToken ct = default);
}
