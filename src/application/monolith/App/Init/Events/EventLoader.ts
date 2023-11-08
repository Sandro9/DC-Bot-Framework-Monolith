import NoModuleFound from "../../Exceptions/NoModuleFound";
import KannDateienLaden from "../../Traits/allgemein/KannDateienLaden";
import EventInterface from "../../Event/EventInterface";
import modul_model from "../../Model/modul/modul_model";
import event_model from "../../Model/modul/event_model";

export default class EventLoader 
{
    private kannDateienLaden: KannDateienLaden = new KannDateienLaden();
    private static EventLoader: EventLoader;

    private STRUCTURE_PATH = "/seite/";
    private BAUSTEIN_PATH = "/baustein";

    private eventTypen = {};

    private constructor(){}

    public static create()
    {
        if(this.EventLoader) return this.EventLoader;
        this.EventLoader = new EventLoader(); 
        return this.EventLoader;
    }

    public lade_events_fuer_modul(modul_mdl: modul_model)
    {
        //unterverzeichnisse der Module Laden und somit eventModels erstellen
        this.kannDateienLaden.gib_dateinamen_aus_verzeichnis(modul_mdl.gib_seiten_pfad(), (subModul) => {
            const eventGeladen: EventInterface = this.eventTypen[subModul.fileName.toLowerCase()];
            if(!eventGeladen) throw new NoModuleFound('No Event found in ' + modul_mdl.gib_name() + ' for '+ subModul.fileName.toLowerCase());
            
            // event Typ laden
            // ist array, da bei sonderfall interaction unterverzeichnisse existieren 
            const event_mdls = eventGeladen.resolve(subModul.path + subModul.fileName);

            // 1 zu 1 beziehung zum modul_model
            event_mdls.forEach((mdl : event_model) => {
                modul_mdl.has_one_many(mdl);
            });
        });
    }

    public _lade_event_typen(refresh: boolean = false)
    {
        if(refresh == false && Object.keys(this.eventTypen).length > 0) return this.eventTypen; 

        this.kannDateienLaden.gib_klassen_aus_verzeichnis(__dirname+"/../../Event/EventTypen/", ((klasse) => {
            this.eventTypen[klasse.default.name.toLowerCase()] = new klasse.default();
        }));
    }

    public gib_event_typen()
    {
        return this.eventTypen;
    }

}