import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, Invite, User } from "discord.js";
import Session from "../../Session/Session";
import event_controller from "../../Controller/event/event_controller";

export interface userUpdateType {
    'newUser' : User,
    'oldUser' : User
}

export default class UserUpdate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "userUpdate";
    eventName: string = "userUpdate";

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (oldUser: User, newUser: User) => {
            if(newUser.bot) return;
            const session = new Session<userUpdateType>(this._ermittle_session_defaults({newUser: newUser, oldUser: oldUser}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: userUpdateType)
    {
        return { 
            "guildID" : null,
            "channelID" : null,
            "userID" : data.newUser.id,
            "data" :  {
                newUser : data.newUser,
                oldUser : data.oldUser
            },
        }
    }
}