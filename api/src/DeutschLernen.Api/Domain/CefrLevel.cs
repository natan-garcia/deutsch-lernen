namespace DeutschLernen.Api.Domain;

/// <summary>CEFR level. Levels are data: adding A2 means adding content, not code.</summary>
public static class CefrLevel
{
    public static readonly IReadOnlyList<string> All = ["A1", "A2", "B1", "B2", "C1", "C2"];

    public static bool IsKnown(string? code) => code is not null && All.Contains(code);
}
