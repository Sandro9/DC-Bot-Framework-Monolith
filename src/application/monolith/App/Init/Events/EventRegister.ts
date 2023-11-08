import { Client } from "discord.js";
import NoEventFound from "../../Exceptions/NoModuleFound";
import event_model from "../../Model/modul/event_model";
import EventLoader from "./EventLoader";

export default class EventRegister
{
    private static EventRegister: EventRegister;
    private eventTypen = EventLoader.create().gib_event_typen();

    private constructor(){}

    public static create()
    {
        if(this.EventRegister) return this.EventRegister;
        this.EventRegister = new EventRegister(); 
        return this.EventRegister;
    }

    public _register(client: Client)
    {
        const events = event_model.gib_alle_datensätze();
        
        // Gruppe ist eine sammlung von Objekten z.B. msg:[MDL,MDL] und interaction{ID1:MDL...}
        const gruppen = {};
        
        //gruppieren der events
        Object.keys(events).forEach((e) => {
            const event: event_model = events[e];    
            const eventTyp = event.gib_event_typ().toLowerCase();

            if(!this.eventTypen[eventTyp]) throw new NoEventFound(event.gib_pfad() + " With ID : " + event.gib_datensatz_id())
            if(!gruppen[eventTyp]) gruppen[eventTyp] = {};
            gruppen[eventTyp][event.gib_datensatz_id()] = event;
        });
        
        for(const i in gruppen) {
            const gruppe = gruppen[i];
            this.eventTypen[i].eventRegister(client, gruppe);
        };
    }

}