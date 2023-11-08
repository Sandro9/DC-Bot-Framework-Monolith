import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, GuildMember } from "discord.js";
import Session from "../../Session/Session";
import event_controller from "../../Controller/event/event_controller";

export interface guildMemberUpdateType {
    'newMember' : GuildMember,
    'oldMember' : GuildMember
}

export default class GuildMemberUpdate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "guildMemberUpdate";
    eventName: string = "guildMemberUpdate";

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (oldMember: GuildMember, newMember: GuildMember) => {
            if(newMember.user.bot) return;
            const session = new Session<guildMemberUpdateType>(this._ermittle_session_defaults({newMember: newMember, oldMember: oldMember}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: guildMemberUpdateType)
    {
        return {
            "guildID" : data.newMember.guild.id,
            "channelID" : null,
            "userID" : data.newMember.user.id,
            "data" : {
                "newMember" : data.newMember,
                "oldMember" : data.oldMember
            }
        }
    }
}