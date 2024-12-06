using System.Collections.Immutable;

public record UpgradeContext(ImmutableList<ShipInfo> ShipInfos, ImmutableSortedDictionary<string, UpgradeInfo> LevelUpgradeInfo);