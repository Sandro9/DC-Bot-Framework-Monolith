import baustein_model from "../../Model/modul/baustein_model";
import template_base_controller from "../template_base_controller";
import KannXML from "../../Traits/allgemein/KannXML";
import KannLiquid from "../../Traits/allgemein/KannLiquid";
import NoTemplateFound from "../../Exceptions/NoTemplateFound";
import Session from "../../Session/Session";
import base_controller from "../base_controller";

export default abstract class execution_base_controller 
{
    private kannLiquid: KannLiquid = new KannLiquid();
    private kannXML : KannXML = new KannXML();

    protected _ermittle_bausteine(template_rendered: any, wrapper_name = "template"): baustein_model[]
    {
        if(!template_rendered[wrapper_name].seite) return [];
        if(template_rendered[wrapper_name].seite[0].bausteine[0].baustein)
        {
            return this._gib_bausteine_aus_pfad_array(template_rendered[wrapper_name].seite[0].bausteine[0].baustein);
        }
    }

    protected _gib_bausteine_aus_pfad_array(baustein: string[])
    {
        const bausteine = [];
        try {
            baustein.forEach((pfad: any) => {
                
                const baustein = baustein_model.laden_unique_indice("bausteinPfad", pfad.pfad[0]);
                if(baustein == undefined){
                    throw new NoTemplateFound(pfad.pfad[0]);
                }
                bausteine.push(baustein);
            })
        } catch(error) {
            console.log(error);
            console.warn(error.getMsg())
        }
        return bausteine;
    }

    protected async _führe_template_aus(controller: base_controller, template: string): Promise<any>
    {
        //@ts-ignore
        const tpl_variablen = controller.gib_template_variablen();
        const rendered = this.kannLiquid.render_template(template, tpl_variablen);
    
        var xml_template = {};
        this.kannXML.parse(rendered, ((err, data) => {
            xml_template = data;
        }));
        return xml_template;
    }
}