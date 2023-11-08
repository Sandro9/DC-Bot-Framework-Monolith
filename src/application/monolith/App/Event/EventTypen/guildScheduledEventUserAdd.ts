import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, GuildScheduledEvent, User } from "discord.js";
import Session from "../../Session/Session";
import event_controller from "../../Controller/event/event_controller";

export interface guildScheduledEventUserAddType {
    "scheduledEvent" : GuildScheduledEvent,
    "user" : User
}

export default class GuildScheduledEventUserAdd extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildScheduledEventUserAdd";
    eventName: string = "guildScheduledEventUserAdd";

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (event: GuildScheduledEvent, user: User) => {
            const session = new Session<guildScheduledEventUserAddType>(this._ermittle_session_defaults({scheduledEvent: event, user: user}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: guildScheduledEventUserAddType)
    {
        return {
            "guildID" : data.scheduledEvent.guild.id,
            "channelID" : data.scheduledEvent.channelId,
            "userID" : data.user.id,
            "data" : {
                "scheduledEvent" : data.scheduledEvent,
                "user" : data.user
            }
        }
    }
}