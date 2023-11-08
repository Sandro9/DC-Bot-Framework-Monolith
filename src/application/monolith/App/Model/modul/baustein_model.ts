import baustein_base_controller from "../../Controller/baustein_base_controller";
import template_base_controller from "../../Controller/template_base_controller";
import dao_baustein from "../../dao/dao_baustein";
import modelType from "../../types/model/modelType";
import model from "../model";

interface baustein extends modelType {
    bausteinPfad: string,
    pfad : string,
    name : string,
    controller: any,
    template: any
}

export default class baustein_model extends model
{

    public static BEREICH: string = "baustein";
    protected DAO_CONTROLLER = new dao_baustein();


    protected static UNIQUE_INDICES = [
        "bausteinPfad"
    ]
    protected IGNORE_EMPTY_CONTROLLER = true;

    private constructor(obj: baustein){
        super(obj);
    }

    public static erstellen(obj: baustein): baustein_model
    {
        return super.erstellen(obj);
    }

    public gib_baustein_pfad()
    {
        return this.DATA.bausteinPfad;
    }

    public gib_template()
    {
        return this.DATA.template;
    }

    public gib_controller(): baustein_base_controller
    {
        return this.DATA.controller;
    }

    public gib_pfad()
    {
        return this.DATA.pfad;
    }
    
}