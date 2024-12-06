class Formatter
{
    public static string Format(TimeSpan timeSpan)
    {
        return $"{timeSpan.Days}d {timeSpan.Hours}h {timeSpan.Minutes}m";
    }

    public static string Format(CurrencyType currencyType)
    {
        return currencyType.ToString().Replace("_", " ");
    }
}