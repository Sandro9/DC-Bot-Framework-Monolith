import event_model from "../Model/modul/event_model";
import eventTypen from "../types/module/eventTypen";
import KannDateienLaden from "../Traits/allgemein/KannDateienLaden";
import KannXML from "../Traits/allgemein/KannXML";
import { Client } from "discord.js";
import event_controller from "../Controller/event/event_controller";
import Session from "../Session/Session";
import KannTemplatesAufloesen from "../Traits/modul/KannTemplatesAufloesen";
import CmdLogger from "../Log/cmd_logger";

type sessionDefaults = {
    "guildID" : string,
    "userID" ?: string,
    "channelID" : string,
    "data" : any,
    "roles" : string[]
}

export default abstract class EventTypBase
{
    protected kannXML:KannXML  = new KannXML()
    protected kannDateienLaden: KannDateienLaden = new KannDateienLaden();
    protected eventTyp: eventTypen = "interaction"; // name of folder
    protected eventName : string = "interactionCreate"; // name of dc event
    protected kannTemplatesAufloesen: KannTemplatesAufloesen = new KannTemplatesAufloesen();


    /**
     * löst submodule verzeichnisse auf
     * @param dir 
     * @param modulName 
     * @returns submodul[] 
     */
    public resolve(dir: string): event_model[]
    {

        let file = this.kannDateienLaden.gib_dateiname(dir, "controller.js");
        const modul = this._erstelle_event_model(file);
        return [modul];
    }
    
    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, async (data) => {
            const session = new Session<sessionDefaults>(this._ermittle_session_defaults(data));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _erstelle_event_model(file): event_model
    {
        const template = this.kannTemplatesAufloesen.lade_template(file.path + "/", "template.liquid");
        const parsedTemplate = this._löse_template_auf(template);

        return event_model.erstellen({
            "name" : file.fileName,
            "eventTyp" : this.eventTyp,
            "pfad" : file.path + "/",
            "controller" : this.kannTemplatesAufloesen.lade_controller(file.path + "/", "controller.js", false),
            "template" : template,
            "parsedTemplate" : parsedTemplate
        });
    }


    protected _ermittle_session_defaults(data: any): any
    {
        return {
            "guildID" : data.guildId,   
            "userID" : data.author.id,
            "channelID" : data.channelId,
            "data" : data
        }
    }

    private _löse_template_auf(template)
    {
        var template;
        this.kannXML.parse(template,(err, data) => {
            if(err) {
                new CmdLogger({
                    'selectedPreset': 'ERROR'
                }).log(err)
            }
            template = data.template;
        });
        return template;
    }
}