import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { GuildMember } from "discord.js";

export interface guildMemberRemoveType {
    guildMember: GuildMember;
}

export default class GuildMemberRemove extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildMemberRemove";
    eventName: string = "guildMemberRemove";

    protected _ermittle_session_defaults(data: GuildMember)
    {
        return { 
            "guildID" : data.guild.id,
            "channelID" : null,
            "userID" : data.user.id,
            "data" : {
                guildMember : data
            },
        }
    }
}