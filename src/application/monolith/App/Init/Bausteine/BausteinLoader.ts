import baustein_model from "../../Model/modul/baustein_model";
import modul_model from "../../Model/modul/modul_model";
import KannDateienLaden from "../../Traits/allgemein/KannDateienLaden";
import KannTemplatesAufloesen from "../../Traits/modul/KannTemplatesAufloesen";

export default class BausteinLoader
{
    private kannDateienLaden: KannDateienLaden = new KannDateienLaden();
    protected kannTemplatesAufloesen: KannTemplatesAufloesen = new KannTemplatesAufloesen();

    private static BausteinLoader;

    private IGNORE_EMPTY_CONTROLLER = true;
    private CONTROLLER_NAME = "controller.js";
    private TEMPLATE_NAME = "standard.liquid";

    private constructor(){}

    public static create()
    {
        if(this.BausteinLoader) return this.BausteinLoader;
        this.BausteinLoader = new BausteinLoader(); 
        return this.BausteinLoader;
    }
    
    public lade_bausteine_fuer_modul(modul_mdl: modul_model)
    {
        // bausteine auflösen und als bausteinModel eintragen
        this.kannDateienLaden.gib_dateinamen_aus_verzeichnis_rekursiv(modul_mdl.gib_baustein_pfad(),".liquid", ((baustein) => {
            modul_mdl.has_one_many(baustein_model.erstellen({
                "pfad" : baustein.path + "/",
                "name" : modul_mdl.gib_name() + "_" + baustein.fileName,
                "bausteinPfad" : baustein.path.replace(modul_mdl.gib_baustein_pfad(), '') + "/",
                "controller" : this.kannTemplatesAufloesen.lade_controller(baustein.path + "/", this.CONTROLLER_NAME, this.IGNORE_EMPTY_CONTROLLER),
                "template" : this.kannTemplatesAufloesen.lade_template(baustein.path + "/", this.TEMPLATE_NAME)
            }));

        }));

    }
}