import KannDateienLaden from "../../Traits/allgemein/KannDateienLaden";
import EventLoader from "../Events/EventLoader";
import modul_model from "../../Model/modul/modul_model";
import BausteinLoader from "../Bausteine/BausteinLoader";
import Startup from "../Startup/Startup";

export default class ModuleLoader 
{
    private kannDateienLaden: KannDateienLaden = new KannDateienLaden();
    private static ModuleLoader: ModuleLoader;

    private STRUCTURE_NAME = "/seite/";
    private BAUSTEIN_NAME = "/baustein";

    private constructor(){}

    public static create()
    {
        if(this.ModuleLoader) return this.ModuleLoader;
        this.ModuleLoader = new ModuleLoader(); 
        return this.ModuleLoader;
    }


    public _lade_module()
    {
        // Module Laden

        this.kannDateienLaden.gib_dateinamen_aus_verzeichnis(__dirname+"/../../../../../application_mvc/app/",((modul) => {
    
            const modulName: any = modul.fileName.toLowerCase(); //
            
            // erstelle parent modul Model
            const modul_mdl: modul_model = modul_model.erstellen({
                name : modulName,
                bausteinPfad : __dirname+"/../../../../../application_mvc/app/" + modulName + this.BAUSTEIN_NAME,
                seitenPfad : __dirname+"/../../../../../application_mvc/app/"+ modulName + this.STRUCTURE_NAME,
                rootPfad : __dirname+"/../../../../../application_mvc/app/" + modulName
            });


            
            EventLoader.create().lade_events_fuer_modul(modul_mdl);
            
            BausteinLoader.create().lade_bausteine_fuer_modul(modul_mdl);
            
            Startup.create().init(modul_mdl);
        }));
    }
}