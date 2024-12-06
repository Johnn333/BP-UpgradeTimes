using System.Collections.Immutable;

public static class UpgradeData
{
    public static ImmutableSortedDictionary<string, UpgradeInfo> LevelUpgradeInfo = new SortedDictionary<string, UpgradeInfo>
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
    }.ToImmutableSortedDictionary(new KeyComparer());

    public static ImmutableSortedDictionary<string, UpgradeInfo> DreadLevelUpgradeInfo = new SortedDictionary<string, UpgradeInfo>
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
    }.ToImmutableSortedDictionary(new KeyComparer());

    public class KeyComparer : IComparer<string>
    {
        public int Compare(string? x, string? y)
        {
            if (x == null || y == null)
                throw new ArgumentNullException("Keys cannot be null.");

            int lengthComparison = x.Length.CompareTo(y.Length);
            if (x.Length.CompareTo(y.Length) != 0)
                return lengthComparison;

            return string.Compare(x, y, StringComparison.Ordinal);
        }
    }
}