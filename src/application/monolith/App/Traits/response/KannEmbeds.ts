import { EmbedBuilder, ColorResolvable, EmbedData } from "discord.js";

export default class KannEmbeds
{

    public create(options: EmbedData)
    {
        return new EmbedBuilder(options);
    }
}