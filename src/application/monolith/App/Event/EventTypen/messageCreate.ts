import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, Message as DiscordMessage } from "discord.js";
import Session from "../../Session/Session";
import event_controller from "../../Controller/event/event_controller";

export interface messageCreateType {
    message: DiscordMessage;
}

export default class MessageCreate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "messageCreate";
    eventName: string = "messageCreate";

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (data: DiscordMessage) => {
            if(data.author.bot) return;
            const session = new Session<any>(this._ermittle_session_defaults(data));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: DiscordMessage)
    {
        return {
            "guildID" : data.guild.id,
            "channelID" : data.channelId,
            "userID" : data.author.id,
            "data" : {
                message : data
            }
        }
    }
}