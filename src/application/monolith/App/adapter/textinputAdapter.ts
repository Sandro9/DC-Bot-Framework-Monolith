import { TextInputStyle } from "discord.js";
import adapter_interface from "../Interfaces/Adapter/adapter_interface";

export default class TextinputAdapter implements adapter_interface
{
    public convertieren(daten)
    {
        let result: any = {};

        daten = daten.daten[0];
        result = {
            'custom_id' : daten.customid[0],
            'label': daten.label[0] ?? 'no label',
            'style' : TextInputStyle[daten.style[0]] ?? TextInputStyle['Paragraph'],
        }

        if(daten.placeholder)
        {
            result.placeholder = daten.placeholder[0];
        }

        if(daten.maxlength)
        {
            result.maxLength = daten.maxlength[0];
        }

        if(daten.minlength)
        {
            result.minLength = daten.minlength[0];
        }

        if(daten.required)
        {
            result.required = daten.required[0];
        }

        if(daten.value)
        {
            result.value = daten.value[0];
        }

        return result;
    }
}