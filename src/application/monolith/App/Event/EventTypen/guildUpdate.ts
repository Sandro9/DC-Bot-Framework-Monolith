import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, Guild } from "discord.js";
import event_controller from "../../Controller/event/event_controller";
import Session from "../../Session/Session";

export interface GuildUpdateType {
    newGuild : Guild,
    oldGuild : Guild
}

export default class GuildUpdate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildUpdate"; // name of folder
    eventName: string = "guildUpdate"; // name of dc event

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (oldGuild: Guild, newGuild: Guild) => {
            console.log("UPDATED");
            const session = new Session<GuildUpdateType>(this._ermittle_session_defaults({newGuild: newGuild, oldGuild: oldGuild}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: GuildUpdateType)
    {
        return { 
            "guildID" : data.newGuild.id,
            "channelID" : null,
            "userID" : null,
            "data" :  {
                newGuild : data.newGuild,
                oldGuild : data.oldGuild
            },
        }
    }
}
