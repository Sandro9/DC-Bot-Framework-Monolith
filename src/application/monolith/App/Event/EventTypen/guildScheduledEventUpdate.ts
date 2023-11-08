import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, GuildScheduledEvent } from "discord.js";
import Session from "../../Session/Session";
import event_controller from "../../Controller/event/event_controller";

export interface guildScheduledEventUpdateType {
    "newScheduledEvent" : GuildScheduledEvent,
    "oldScheduledEvent" : GuildScheduledEvent
}

export default class GuildScheduledEventUpdate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildScheduledEventUpdate";
    eventName: string = "guildScheduledEventUpdate";

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (oldEvent: GuildScheduledEvent, newEvent: GuildScheduledEvent) => {
            const session = new Session<guildScheduledEventUpdateType>(this._ermittle_session_defaults({newScheduledEvent: newEvent, oldScheduledEvent: oldEvent}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: guildScheduledEventUpdateType)
    {
        return {
            "guildID" : data.newScheduledEvent.guild.id,
            "channelID" : data.newScheduledEvent.channelId,
            "userID" : data.newScheduledEvent.creatorId,
            "data" : {
                "newScheduledEvent" : data.newScheduledEvent,
                "oldScheduledEvent" : data.oldScheduledEvent
            }
        }
    }
}