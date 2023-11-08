import { ButtonBuilder, ButtonComponentData } from "discord.js";

export default class KannButtons
{

    public create(options: ButtonComponentData)
    {
        return new ButtonBuilder(options);
    }
}