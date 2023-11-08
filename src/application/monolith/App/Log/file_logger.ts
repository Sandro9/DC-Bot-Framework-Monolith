import KannDateienLaden from "../Traits/allgemein/KannDateienLaden";
import KannDateienPruefen from "../Traits/allgemein/KannDateienPruefen";
import KannDateienSchreiben from "../Traits/allgemein/KannDateienSchreiben";
import Logger from "./Logger";

type config = {
    logPath ?: string,
    logName ?: string
}

export default class FileLogger implements Logger 
{
    private kannDateienSchreiben: KannDateienSchreiben = new KannDateienSchreiben();
    private kannDateienPruefen: KannDateienPruefen = new KannDateienPruefen()
    private logPath: string;
    private logName: string;

    public constructor(config: config = {})
    {
        this.logPath = config.logPath ?? __dirname + "/../../../../../Logs/";
        this.logName = config.logName ?? "error_log.txt";
    }

    log(msg: string)
    {
        if(!this.kannDateienPruefen.pruefe_pfad_existenz(this.logPath+this.logName)) 
        {
            this.kannDateienSchreiben.schreibe_datei(this.logPath,this.logName, new Date().toString() + msg);
        } else {
            this.kannDateienSchreiben.schreibe_datei_anfuegen(this.logPath,this.logName, new Date().toString() + msg);
        }
    }

}