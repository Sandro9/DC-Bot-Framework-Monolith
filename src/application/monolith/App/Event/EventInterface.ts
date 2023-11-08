import eventTypen from "../types/module/eventTypen";
import event_model from "../Model/modul/event_model";
import { Client } from "discord.js";

export default interface EventInterface 
{
    resolve(dir: string): event_model[];
    eventTyp: eventTypen;
    eventRegister(client: Client, modul: event_model);
}