import { Client } from "discord.js";
import Init from "./Init/Init";

export default class Monolith 
{
    public constructor()
    {

    }

    public run(client: Client, config)
    {
        const i = new Init();
        i.init(client);
        // const d = new welcomeMessageController();

        
    }

}