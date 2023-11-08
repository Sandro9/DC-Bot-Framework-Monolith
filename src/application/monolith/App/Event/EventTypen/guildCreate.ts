import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Guild } from "discord.js";

export interface guildCreateType {
    guild : Guild
}

export default class GuildCreate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildCreate"; // name of folder
    eventName: string = "guildCreate"; // name of dc event

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
