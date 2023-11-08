import event_model from "../../Model/modul/event_model";
import eventTypen from "../../types/module/eventTypen";
import EventInterface from "../EventInterface";
import EventTypBase from "../EventTypBase";
import { Client } from "discord.js";
import befehl_model from "../../Model/template/befehl_model";
import ExtendedInteraction from "../../types/Interaction";
import event_controller from "../../Controller/event/event_controller";
import Session from "../../Session/Session";

export interface interactionType {
    interaction: ExtendedInteraction
}

export default class Interaction extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "interaction";
    eventName: string = "interactionCreate";


    private loadedInteractions = {};

    // benötigt hier eine kleine sonderbehandlung, da ja die  interactions noch mal in unterordnern sind
    public resolve(dir: string): event_model[]
    {

        // lade die befehle Anhand des Verzeichnis namens
        var geladeneSubModule = [];
        this.kannDateienLaden.gib_dateinamen_aus_verzeichnis(dir, (submodul) => {

            let file = this.kannDateienLaden.gib_dateiname(submodul.path + '/' +submodul.fileName, "controller.js");
            
            const subModul = this._erstelle_event_model(file) 
            geladeneSubModule.push(subModul);
        });
        
        return geladeneSubModule
    }

    public eventRegister(client: Client, event_models_obj: object): void
    {
        // auflösen der custom_ID's als Key damit einfacher geprüft werden kann
        let customID_model_zuordnung = this._ermittle_ID_model_zuordnung(event_models_obj);
        
        client.on("interactionCreate", async (interaction: ExtendedInteraction) => {
            const id = interaction.commandName ?? interaction.customId;
            if(!customID_model_zuordnung[id]) return;
            const session = new Session<any>(this._ermittle_session_defaults(interaction));
            const model = customID_model_zuordnung[id];
            const controller = new event_controller();
            controller.run(session, model);
        });
    }

    private _ermittle_ID_model_zuordnung(event_models_obj: object): object
    {
        let customID_model_zuordnung = {};
        Object.keys(event_models_obj).forEach((e) => {
            const mdl: event_model = event_models_obj[e];
            const befehl: befehl_model = mdl.gib_one(befehl_model.BEREICH);
            customID_model_zuordnung[befehl.gib_befehl_ID()] = mdl;
        });

        return customID_model_zuordnung;
    }

    protected _ermittle_session_defaults(data: ExtendedInteraction)
    {
        return {
            "guildID" : data.guildId, 
            "channelID" : data.channelId,  
            "userID" : data.user.id,
            "replyObj" : data,
            "roles" : data.member._roles,
            "data" : {
                interaction: data
            }
        }
    }
}