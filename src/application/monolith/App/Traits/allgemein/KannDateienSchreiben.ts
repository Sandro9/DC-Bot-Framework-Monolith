import fs from "fs";

export default class KannDateienSchreiben
{
    public schreibe_datei(pfad: string, dateiName: string, daten: any, jsonDecode = false): void
    {
        if(JSON){
            daten = JSON.stringify(daten);
        }

        fs.writeFileSync(pfad + dateiName, daten);
    }

    public schreibe_datei_anfuegen(pfad: string, dateiName: string, daten: any, jsonDecode = false): void
    {
        if(JSON){
            daten = JSON.stringify(daten);
        }

        fs.appendFileSync(pfad + dateiName, daten + "\n" ,"utf8");
    }
}
  