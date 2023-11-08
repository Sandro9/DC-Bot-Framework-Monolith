import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Invite } from "discord.js";

export interface inviteCreateType {
    invite: Invite;
}

export default class InviteCreate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "inviteCreate";
    eventName: string = "inviteCreate";

    protected _ermittle_session_defaults(data: Invite)
    {
        return { 
            "guildID" : data.guild.id,
            "channelID" : data.channelId,
            "userID" : data.inviterId,
            "data" :  {
                invite : data
            },
        }
    }
}