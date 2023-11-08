import modul_model from "../../Model/modul/modul_model";
import KannDateienLaden from "../../Traits/allgemein/KannDateienLaden";
import fs from "fs"
import KannDateienPruefen from "../../Traits/allgemein/KannDateienPruefen";
import CmdLogger from "../../Log/cmd_logger";

export default class Startup 
{
    private kannDateienLaden: KannDateienLaden = new KannDateienLaden();
    private kannDateienPruefen: KannDateienPruefen = new KannDateienPruefen();
    private CmdLogger: CmdLogger = new CmdLogger();
    private static Startup: Startup;

    private STRUCTURE_NAME = "/seite/";
    private BAUSTEIN_NAME = "/baustein";

    private constructor(){}

    public static create()
    {
        if(this.Startup) return this.Startup;
        this.Startup = new Startup(); 
        return this.Startup;
    }

    public init(modul_mdl: modul_model)
    {
        const modulPfad = modul_mdl.gib_root_pfad()+ "/start/";

        if(!this.kannDateienPruefen.pruefe_pfad_existenz(modulPfad)) return;

        this.kannDateienLaden.gib_klassen_aus_verzeichnis(modulPfad,(classData => {
            new classData.default().execute(globalThis.client);
        }));
    }

}