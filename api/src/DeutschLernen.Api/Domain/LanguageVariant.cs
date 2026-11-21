namespace DeutschLernen.Api.Domain;

/// <summary>
/// Language variant of a resource, as a BCP 47-style code. Standard German first;
/// Swiss German (gsw-CH) falls back to standard German where it has no own version.
/// </summary>
public static class LanguageVariant
{
    public const string StandardGerman = "de-DE";
    public const string SwissGerman = "gsw-CH";

    public static readonly IReadOnlySet<string> All = new HashSet<string> { StandardGerman, SwissGerman };

    public static bool IsKnown(string? code) => code is not null && All.Contains(code);
}
