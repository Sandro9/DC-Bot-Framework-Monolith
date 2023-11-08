import { Client, GatewayIntentBits, Partials } from "discord.js";			
import { Liquid } from "liquidjs";
import MainConfig from "./application/monolith/Configs/MainConfig.js";
import Monolith from "./application/monolith/App/App.js";
// const xmlParser = require('xml2js').parseString;
// const engine = new Liquid();


const client: Client = new Client({
    intents : [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildScheduledEvents,
    ],
    partials : [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.GuildScheduledEvent
    ]
});		
const config = MainConfig;  
const app = new Monolith();

client.on("ready", async () =>													
{
    app.run(client, config);
    
});



process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason: any, promise) => {
    console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
});

client.login(config.BOT_TOKEN);	// Bot mit TOKEN einloggen