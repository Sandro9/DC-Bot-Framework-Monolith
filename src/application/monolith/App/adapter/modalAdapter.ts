import { ModalComponentData } from "discord.js";
import adapter_interface from "../Interfaces/Adapter/adapter_interface";

export default class ModalAdapter implements adapter_interface
{
    public convertieren(daten): ModalComponentData
    {
        daten = daten.daten[0];

        return {
            "components" : [],
            "customId" : daten.customid[0],
            "title" : daten.title[0]
        }
    }
}