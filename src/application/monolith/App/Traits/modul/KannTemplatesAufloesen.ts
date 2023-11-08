import NoControllerFound from "../../Exceptions/NoControllerFound";
import NoTemplateFound from "../../Exceptions/NoTemplateFound";
import KannDateienLaden from "../allgemein/KannDateienLaden";


export default class KannTemplatesAufloesen
{
    protected kannDateienLaden: KannDateienLaden = new KannDateienLaden()


    public lade_template(path: string, name = 'template.liquid'): string
    {
        // template ist optional -> wenn nicht vorhanden kein response, Zugriffsbeschränkungen....
        try {
            var template = this.kannDateienLaden.gib_datei(path,name);
            return template;
        } catch(e) {
            new NoTemplateFound(path)
            process.exit(1);
        }
    }

    public lade_controller(path: string, name = 'controller.js', IGNORE_EMPTY_CONTROLLER = false): any
    {
        try {
            var controller = this.kannDateienLaden.gib_klasse_aus_datei(path,name).default;
            controller = new controller();
        } catch(e) {
            
            // no controller found 
            if(!IGNORE_EMPTY_CONTROLLER){
                new NoControllerFound(path)
                console.log(e);
                process.exit(1);
            }
        }

        return controller;
    }
}