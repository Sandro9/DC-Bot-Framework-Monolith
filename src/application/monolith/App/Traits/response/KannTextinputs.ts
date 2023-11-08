import { TextInputBuilder } from "@discordjs/builders";
import { TextInputComponentData } from "discord.js";

export default class KannTextinputs
{
    public create(options: TextInputComponentData)
    {
        //@ts-ignore
        return new TextInputBuilder(options);
    }
}