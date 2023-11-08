import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { GuildScheduledEvent } from "discord.js";

export interface guildScheduledEventCreateType {
    scheduledEvent: GuildScheduledEvent;
}

export default class GuildScheduledEventCreate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildScheduledEventCreate";
    eventName: string = "guildScheduledEventCreate";

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