import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Guild, GuildChannel, Role } from "discord.js";

export interface roleCreateType {
    role : Role
}

export default class RoleCreate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "roleCreate"; // name of folder
    eventName: string = "roleCreate"; // name of dc event

    protected _ermittle_session_defaults(data: Role)
    {
        return { 
            "guildID" : data.guild.id,
            "channelID" : null,
            "userID" : null,
            "data" :  {
                role : data
            },
        }
    }
}
