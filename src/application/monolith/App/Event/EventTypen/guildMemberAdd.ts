import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { GuildMember } from "discord.js";

export interface guildMemberAddType {
    guildMember : GuildMember
}

export default class GuildMemberAdd extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildMemberAdd"; // name of folder
    eventName: string = "guildMemberAdd"; // name of dc event

    protected _ermittle_session_defaults(data: GuildMember)
    {
        return { 
            "guildID" : data.guild.id,
            "channelID" : null,
            "userID" : data.user.id,
            "data" :  {
                guildMember : data
            },
        }
    }
}
