import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, Guild, GuildChannel } from "discord.js";
import event_controller from "../../Controller/event/event_controller";
import Session from "../../Session/Session";

export interface channelUpdateType {
    newChannel : GuildChannel
    oldChannel : GuildChannel
}

export default class ChannelUpdate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "channelUpdate"; // name of folder
    eventName: string = "channelUpdate"; // name of dc event

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (oldChannel: GuildChannel, newChannel: GuildChannel) => {
            const session = new Session<channelUpdateType>(this._ermittle_session_defaults({newChannel: newChannel, oldChannel: oldChannel}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: channelUpdateType)
    {
        return { 
            "guildID" : data.newChannel.guildId,
            "channelID" : data.newChannel.id,
            "userID" : null,
            "data" :  {
                newChannel: data.newChannel,
                oldChannel: data.oldChannel
            },
        }
    }
}
