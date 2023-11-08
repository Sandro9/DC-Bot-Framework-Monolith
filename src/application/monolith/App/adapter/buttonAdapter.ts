import { ButtonStyle } from "discord.js";
import Exception from "../Exceptions/Exception";
import TemplateParsing from "../Exceptions/TemplateParsing";
import adapter_interface from "../Interfaces/Adapter/adapter_interface";

export default class ButtonAdapter implements adapter_interface
{
    public convertieren(daten)
    {
        let result: any = {};
        daten = daten.daten[0];


        result.style = ButtonStyle[daten.style[0]] ?? ButtonStyle['PRIMARY'];
        result.custom_id = daten.customid[0] ?? 'no-id-specified';
        result.label = daten.label[0] ?? 'empty';
        result.disabled = daten.disabled[0] ?? false;
        
        if(daten.emoji)
        {
            result.emoji = daten.emoji[0];
        }

        if(result.style === 'Link')
        {
            if(!daten.url) throw new TemplateParsing("Ein Button vom Typ Link benötigt eine URL!");

            result.url = daten.url[0];
        }
        
        return result;
    }
}