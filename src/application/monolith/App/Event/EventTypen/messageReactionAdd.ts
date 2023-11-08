import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, GuildMember, MessageReaction, User } from "discord.js";
import event_controller from "../../Controller/event/event_controller";
import Session from "../../Session/Session";

export interface messageReactionAddType {
    reaction : MessageReaction,
    user : User
}

export default class MessageReactionAdd extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "messageReactionAdd";
    eventName: string = "messageReactionAdd";

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (reaction: MessageReaction, user: User) => {
            const session = new Session<messageReactionAddType>(this._ermittle_session_defaults({reaction: reaction, user: user}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: messageReactionAddType)
    {
        return {
            "guildID" : data.reaction.message.guildId,
            "channelID" : data.reaction.message.channelId,
            "userID" : data.user.id,
            "data" : {
                "reaction" : data.reaction,
                "user" : data.user
            }
        }
    }
}