import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, Guild, GuildChannel, Role } from "discord.js";
import event_controller from "../../Controller/event/event_controller";
import Session from "../../Session/Session";

export interface roleUpdateType {
    newRole : Role,
    oldRole : Role
}

export default class RoleUpdate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "roleUpdate"; // name of folder
    eventName: string = "roleUpdate"; // name of dc event

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (oldRole: Role, newRole: Role) => {
            const session = new Session<roleUpdateType>(this._ermittle_session_defaults({newRole: newRole, oldRole: oldRole}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: roleUpdateType)
    {
        return { 
            "guildID" : data.newRole.guild.id,
            "channelID" : null,
            "userID" : null,
            "data" :  {
                newRole : data.newRole,
                oldRole : data.oldRole
            },
        }
    }
}
