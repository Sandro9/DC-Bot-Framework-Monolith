import eventTypen from "../../types/module/eventTypen";
import EventTypBase from "../EventTypBase";
import EventInterface from "../EventInterface";
import { Client, GuildMember, VoiceState } from "discord.js";
import event_controller from "../../Controller/event/event_controller";
import Session from "../../Session/Session";

export interface voiceStateUpdateType {
    newVoice: VoiceState,
    oldVoice: VoiceState
}

export default class VoiceStateUpdate extends EventTypBase implements EventInterface
{
    eventTyp: eventTypen = "voiceStateUpdate";
    eventName: string = "voiceStateUpdate";

    public eventRegister(client: Client, event_models_obj : object)
    {
        client.on(this.eventName, (oldVoice: VoiceState, newVoice: VoiceState) => {
            const session = new Session<voiceStateUpdateType>(this._ermittle_session_defaults({newVoice: newVoice, oldVoice: oldVoice}));
            Object.keys(event_models_obj).forEach(e => {
                const model = event_models_obj[e];
                const controller = new event_controller();
                controller.run(session, model);
            });
        });
    }

    protected _ermittle_session_defaults(data: voiceStateUpdateType)
    {
        return {
            "guildID" : data.newVoice.guild.id,
            "channelID" : data.newVoice.channelId ?? data.oldVoice.channelId,
            "userID" : data.newVoice.id,
            "data" : {
                "newVoice" : data.newVoice,
                "oldVoice" : data.oldVoice
            }
        }
    }
}