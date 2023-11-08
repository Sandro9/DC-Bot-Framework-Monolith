import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, Message as DiscordMessage } from "discord.js";
import Session from "../../Session/Session";
import event_controller from "../../Controller/event/event_controller";

export interface messageDeleteType {
    message: DiscordMessage;
}

export default class MessageDelete extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "messageDelete";
    eventName: string = "messageDelete";

    protected _ermittle_session_defaults(data: DiscordMessage)
    {
        return {
            "guildID" : data.guildId,
            "channelID" : data.channelId,
            "userID" : null,
            "data" : {
                message : data
            }
        }
    }
}