import Session from "../../Session/Session";
import { ActionRowBuilder, Client, ModalBuilder } from "discord.js";
import Response from "../../Exceptions/Response";



type antwort = {
    typ : "DM" | "CHANNEL" | "REPLY" | "EDIT" | "MODAL",
    ID ?: string,
    ephemeral ?: boolean
}
//ID gibt es bei REPLY nicht


type responseData = {
    default : {
        content : string,
        embeds : any[],
        components : any,
        ephemeral ?: boolean
    },
    modal: any
}

export default class KannResponse 
{


    public async _sende_response(session: Session<any>,template_rendered, responseData: responseData)
    {
        const result = {
            'DM' : [],
            'CHANNEL' : [],
            'REPLY' : [],
        }
        const client: Client = globalThis.client;
        if(template_rendered.baustein.antworten[0])
        {
            for(const response of template_rendered.baustein.antworten[0].antwort) {

                if(response.typ[0] == 'DM') {
                    try {
                        result['DM'].push(
                            await (await (await client.guilds.fetch(session.get_guildID())).members.fetch(response.ID[0])).send(responseData.default)
                        );
                    } catch (e) {
                        new Response('KannResponse DM send');
                    }
                } else if(response.typ[0] == 'CHANNEL') {
                    try {
                        result['CHANNEL'].push(
                            //@ts-ignore
                            await (await (await client.guilds.fetch(session.get_guildID())).channels.fetch(response.ID[0])).send(responseData.default)
                        )
                    } catch (e) {
                        new Response('KannResponse Channel send');
                    }
                } else if(response.typ[0] == 'REPLY') {
                    try {
                        responseData.default.ephemeral = response.ephemeral[0] ?? true;
                        result['REPLY'].push(await session.get_replyObj().reply(responseData.default));
                    } catch (e) {
                        new Response('KannResponse Reply send');
                    }
                    
                } else if(response.typ[0] == 'MODAL') {
                    try {
                        session.get_replyObj().showModal(responseData.modal);
                    } catch (e) {
                        new Response('KannResponse Modal send');
                    }
                    return; // do not mix modals and default responses
                } else if(response.typ[0] == 'EDIT') {
                    try {
                            //@ts-ignore
                            await(await (await (await client.guilds.fetch(session.get_guildID())).channels.fetch(session.get_channelID())).messages.fetch(response.ID[0])).edit(responseData.default)
                    } catch(e) {
                        new Response('KannResponse edit' + e);
                    }
                }
            }
        }
        return result;
    }

}