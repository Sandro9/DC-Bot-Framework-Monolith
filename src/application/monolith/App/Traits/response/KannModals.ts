import { ModalBuilder, ModalComponentData } from "discord.js";

export default class KannModals
{
    public create(options: ModalComponentData)
    {
        return new ModalBuilder(options);
    }
}