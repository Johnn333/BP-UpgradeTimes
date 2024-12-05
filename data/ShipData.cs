public static class ShipData
{
    public record ShipInfo(string Name, bool IsFlag);
    public static IReadOnlyList<ShipInfo> ShipInfos => new List<ShipInfo>
    {
        { new ShipInfo( "Flagship", true) },
        { new ShipInfo( "Ship 1", false ) },
        { new ShipInfo( "Ship 2", false ) },
        { new ShipInfo( "Ship 3", false ) },
        { new ShipInfo( "Ship 4", false ) },
    };

    public static IReadOnlyList<ShipInfo> DreadInfos => new List<ShipInfo>
    {
        { new ShipInfo( "Dreadnaught", false ) }
    };
}
