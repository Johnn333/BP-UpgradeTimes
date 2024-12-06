using System.Collections.Immutable;

public static class ShipData
{
    public static ImmutableList<ShipInfo> FleetInfo { get; } =
    [
        new ShipInfo("Flagship", true),
        new ShipInfo("Ship 1", false),
        new ShipInfo("Ship 2", false),
        new ShipInfo("Ship 3", false),
        new ShipInfo("Ship 4", false)
    ];

    public static ImmutableList<ShipInfo> DreadInfo { get; } = 
    [
        new ShipInfo("Dreadnaught", false)
    ];
}
