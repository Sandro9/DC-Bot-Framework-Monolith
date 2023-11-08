import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { GuildScheduledEvent } from "discord.js";

export interface guildScheduledEventDeleteType {
    scheduledEvent: GuildScheduledEvent;
}

export default class GuildScheduledEventDelete extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildScheduledEventDelete";
    eventName: string = "guildScheduledEventDelete";

    protected _ermittle_session_defaults(data: GuildScheduledEvent)
    {
        
        return {
            "guildID" : data.guild.id,
            "userID" : data.creatorId,
            "data" : {
                scheduledEvent : data
            },
        }
    }
}