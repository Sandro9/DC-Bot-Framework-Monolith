import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Guild } from "discord.js";

export interface guildDeleteType {
    guild : Guild
}

export default class GuildDelete extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildDelete"; // name of folder
    eventName: string = "guildDelete"; // name of dc event

    protected _ermittle_session_defaults(data: Guild)
    {
        return { 
            "guildID" : data.id,
            "channelID" : null,
            "userID" : null,
            "data" :  {
                guild : data
            },
        }
    }
}
