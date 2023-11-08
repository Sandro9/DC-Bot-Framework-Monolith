import dao_events from "../../dao/dao_event";
import modelType from "../../types/model/modelType";
import model_interface from "../../Interfaces/Models/model_interface";
import rechte_model from "../template/rechte_model";
import befehl_model from "../template/befehl_model";
import model from "../model";
import template_base_controller from "../../Controller/template_base_controller";

interface event extends modelType {
    eventTyp: any,
    parsedTemplate : any,
    template : any,
    controller : any,
    pfad: any,
    name: any
}

interface DATA {
    
}

export default class event_model extends model implements model_interface
{
    public static BEREICH: string = "event";
    protected DAO_CONTROLLER = new dao_events();


    private constructor(obj: event){
        super(obj);
    }

    public gib_event_typ()
    {
        return this.DATA.eventTyp;
    }

    public gib_template()
    {
        return this.DATA.template;
    }

    public gib_controller(): template_base_controller
    {
        return this.DATA.controller;
    }

    public gib_pfad()
    {
        return this.DATA.pfad;
    }

    public static erstellen(obj: event): event_model
    {
        return super.erstellen(obj);
    }

    protected after_save()
    {
        const template = this.DATA.parsedTemplate;
        if(template.rechte)
        {
            this._baue_rechte(template.rechte);
        }

        if(template.befehl)
        {
            this._baue_befehl(template.befehl);
        }
    }


    private _baue_rechte(data)
    {
        this.has_one( rechte_model.erstellen({
            "showError" : false,
            rechte : data[0]
        }),true);
    }

    private _baue_befehl(data)
    {
        this.has_one( befehl_model.erstellen({
            befehl : data[0],
            befehlID : data[0].ID[0]
        }),true);
    }
}