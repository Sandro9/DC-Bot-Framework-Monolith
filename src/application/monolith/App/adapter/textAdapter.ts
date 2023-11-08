import { ButtonStyle } from "discord.js";
import TemplateParsing from "../Exceptions/TemplateParsing";
import adapter_interface from "../Interfaces/Adapter/adapter_interface";

export default class TextAdapter implements adapter_interface
{
    public convertieren(daten)
    {
        let result: any = {};
        daten = daten.daten[0];


        result = daten.text[0];
        
        return result;
    }
}