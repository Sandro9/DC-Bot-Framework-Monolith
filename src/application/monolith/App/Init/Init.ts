import { Client } from "discord.js";
import DB from "../../DB/DB";
import EventLoader from "./Events/EventLoader";
import EventRegister from "./Events/EventRegister";
import ModuleLoader from "./Modules/ModuleLoader";
import SlashCommands from "./SlashCommands/SlashCommands";

export default class Init {

    public async init(client : Client)
    {
        globalThis.client = client;
        await DB.create().initMongoose();

        await EventLoader.create()._lade_event_typen();
        await ModuleLoader.create()._lade_module();
        await EventRegister.create()._register(client);
        await SlashCommands.create().register(client);
    }
}