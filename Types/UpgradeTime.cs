public class UpgradeTime(TimeSpan times, int IntelDiscount)
{
    private TimeSpan Time { get; set; } = times * ( 100D - IntelDiscount) / 100D ;

    public TimeSpan GetTimeSpan()
    {
        return Time;
    }

    override public string ToString(){
        return Formatter.Format(Time);
    }
}