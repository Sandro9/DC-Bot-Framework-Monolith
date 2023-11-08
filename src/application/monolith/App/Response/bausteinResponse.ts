import { ActionRowBuilder } from "discord.js";
import baustein_response_interface from "../Interfaces/Response/baustein_response_interface"

export default class BausteinResponse {

    public convertiere_data_zu_response(bausteine: baustein_response_interface[])
    {
        var components: any = [];
        var embeds = [];
        var text = " ";
        var modal = null;
        var modalInputs = [];

        for(const baustein of bausteine) {
            switch(baustein.name) {
                case 'button':
                case 'selectmenu':
                    if(components.length == 0) components[0] = new ActionRowBuilder();
                    components[0].addComponents(baustein.data);
                    break;
                case 'content':
                    text = baustein.data;
                    break;
                case 'embed':
                    embeds.push(baustein.data);
                    break;
                case 'modal':
                    modal = baustein.data;
                    break;
                case 'textinput':
                    modalInputs.push(baustein.data);
                    break;
            }
        }

        if(modal != null) 
        {
            for(const input of modalInputs)
            {
                const row = new ActionRowBuilder().addComponents(input);
                modal.addComponents(row);
            }
        }

        return {
            'modal' : modal,
            'default' : {
                'components' : components,
                'embeds' : embeds,
                'content': text
            },
        }

    }
}