public static class UpgradeData
{
    public record UpgradeTimeInfo(UpgradeTime? Flag, UpgradeTime Normal);
    public record UpgradeInfo(CurrencyType CurrencyType, HullInfo NormalInfo, FlagInfo? FlagInfo = null);
    public record HullInfo(int CurrencyCost, TimeSpan BaseTime);
    public record FlagInfo(int CurrencyCost, TimeSpan BaseTime) : HullInfo(CurrencyCost, BaseTime);
    public enum CurrencyType
    {
        Kits,
        Capital_Cores,
        Evolution_Fragments
    }

    public static IReadOnlyDictionary<string, UpgradeInfo> LevelUpgradeInfo => new Dictionary<string, UpgradeInfo>
    {
        { 
            "U1", new UpgradeInfo
            (
                CurrencyType.Kits,
                new HullInfo(10, new TimeSpan( 0, 19, 23, 0 )),
                new FlagInfo(10, new TimeSpan( 0, 22, 28, 0 ))
            )
        },
        { 
            "U2", new UpgradeInfo
            (
                CurrencyType.Kits,
                new HullInfo(30, new TimeSpan( 2, 10, 8, 0 )),
                new FlagInfo(40, new TimeSpan( 2, 19, 20, 0 ))
            )
        },
        { 
            "U3", new UpgradeInfo
            (
                CurrencyType.Kits,
                new HullInfo(60, new TimeSpan( 4, 20, 17, 0 )),
                new FlagInfo(80, new TimeSpan( 5, 14, 39, 0 ))
            )
        },
        { 
            "X1", new UpgradeInfo
            (
                CurrencyType.Kits,
                new HullInfo(60, new TimeSpan( 5, 2, 26, 0 )),
                new FlagInfo(80, new TimeSpan( 8, 12, 0, 0 ))
            )
        },
        { 
            "CAP", new UpgradeInfo
            (
                CurrencyType.Capital_Cores,
                new HullInfo(10, new TimeSpan( 7, 15, 37, 0 )),
                new FlagInfo(10, new TimeSpan( 11, 21, 43, 0 ))
            )
        },
    };

    public static IReadOnlyDictionary<string, UpgradeInfo> DreadLevelUpgradeInfo => new Dictionary<string, UpgradeInfo>
    {
        { 
            "E1", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(5, new TimeSpan( 2, 13, 12, 0 ))
            )
        },
        { 
            "E2", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(10, new TimeSpan( 2, 13, 12, 0 ))
            )
        },
        { 
            "E3", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(15, new TimeSpan( 2, 13, 12, 0 ))
            )
        },
        { 
            "E4", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(20, new TimeSpan( 2, 13, 12, 0 ))
            )
        },
        { 
            "E5", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(50, new TimeSpan( 3, 9, 35, 0 ))
            )
        },
        { 
            "E6", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(75, new TimeSpan( 3, 9, 35, 0 ))
            )
        },
        { 
            "E7", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(100, new TimeSpan( 3, 9, 35, 0 ))
            )
        },
        { 
            "E8", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(125, new TimeSpan( 3, 9, 35, 0 ))
            )
        },
        { 
            "E9", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(150, new TimeSpan( 4, 6, 0, 0 ))
            )
        },
        { 
            "E10", new UpgradeInfo
            (
                CurrencyType.Evolution_Fragments,
                new HullInfo(200, new TimeSpan( 5, 2, 25, 0 ))
            )
        },
    };
}