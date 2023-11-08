import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Invite } from "discord.js";

export interface inviteDeleteType {
    invite: Invite;
}

export default class InviteDelete extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "inviteDelete";
    eventName: string = "inviteDelete";

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