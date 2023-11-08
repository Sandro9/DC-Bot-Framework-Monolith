import { Client, REST, Routes } from "discord.js";
import MainConfig from "../../../Configs/MainConfig";
import FileLogger from "../../Log/file_logger";
import befehl_model from "../../Model/template/befehl_model";
import KannSlashCommands from "../../Traits/modul/KannSlashCommands";

export default class SlashCommands 
{
    private kannSlashCommands: KannSlashCommands = new KannSlashCommands();

    private token = MainConfig.BOT_TOKEN;
    private rest : REST;
    private static SlashCommands: SlashCommands;
    
    private constructor(){
        this.rest = new REST({ version: '10' }).setToken(this.token);
    }
    
    public static create()
    {
        if(this.SlashCommands) return this.SlashCommands;
        this.SlashCommands = new SlashCommands(); 
        return this.SlashCommands;
    }

    public async register(client: Client)
    {
        const models = befehl_model.gib_alle_datensätze();
        const commands = [];
        
        for(const ID in models)
        {
            const model: befehl_model = models[ID];
            const data = model.gib_befehl();
            if(data.daten)
            {
                commands.push(this.kannSlashCommands.create(data));
            }
        }

        await this.rest.put(
            Routes.applicationCommands(client.user.id), {
                body : commands
            }
        )
        .then(() => {
            console.log(`Erfolgreich registriert(e): ${commands.length} Befehle`)
        }).catch((error) => {
            console.log(error);
        })
    }
}