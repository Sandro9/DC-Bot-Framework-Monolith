import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Guild, GuildChannel } from "discord.js";

export interface channelDeleteType {
    channel : GuildChannel
}

export default class ChannelDelete extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "channelDelete"; // name of folder
    eventName: string = "channelDelete"; // name of dc event

    protected _ermittle_session_defaults(data: GuildChannel)
    {
        return { 
            "guildID" : data.guildId,
            "channelID" : data.id,
            "userID" : null,
            "data" :  {
                channel : data
            },
        }
    }
}
