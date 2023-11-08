import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, Presence, PresenceData, PresenceStatus } from "discord.js";
import Session from "../../Session/Session";
import event_controller from "../../Controller/event/event_controller";

export interface presenceUpdateType {
    oldPresence: Presence,
    newPresence: Presence
}

export default class PresenceUpdate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "presenceUpdate";
    eventName: string = "presenceUpdate";

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (oldPresence: Presence, newPresence: Presence) => {
            if(newPresence.user.bot) return;
            const session = new Session<presenceUpdateType>(this._ermittle_session_defaults({newPresence: newPresence, oldPresence: oldPresence}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: presenceUpdateType)
    {
        return {
            "guildID" : data.newPresence.guild.id,
            "userID" : data.newPresence.user.id,
            "channelID" : null,
            "data" : {
                "newPresence" : data.newPresence,
                "oldPresence" : data.oldPresence
            }
        }
    }
}