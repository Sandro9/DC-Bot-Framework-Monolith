export default class KannDatum
{
    public gib_Datum_timestamp()
    {
        var today = new Date();
        return Math.round(new Date(`${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} 00:00:00`).getTime()/1000);
    }

    public gib_Stunde_timestamp()
    {
        var today = new Date();
        return Math.round(new Date(`${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${today.getHours()}:00:00`).getTime()/1000)
    }

    public gib_jetzt()
    {
        return Math.floor(Date.now()/1000);
    }

    public gib_Woche_timestamp()
    {
        const today = new Date('Thu Nov 17 2022');
        return new Date(`${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} 00:00:00`).getTime()/1000 - ((today.getDay() - 1) * 86400);
    }
}