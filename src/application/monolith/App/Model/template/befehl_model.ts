import dao_befehl from "../../dao/dao_befehl";
import ModelInterface from "../../Interfaces/Models/model_interface";
import modelType from "../../types/model/modelType";
import model from "../model";
import event_model from "../modul/event_model";

interface befehl extends modelType {
    "befehl" : {
        ID : any,
        daten : any
    },
    befehlID
}

export default class befehl_model extends model implements ModelInterface
{
    public static BEREICH: string = "befehl";
    protected DAO_CONTROLLER = new dao_befehl();

    protected static UNIQUE_INDICES = [
        "befehlID"
    ];

    private constructor(obj: befehl){
        super(obj);
    }

    public gib_befehl_ID()
    {
        return this.DATA.befehlID;
    }

    public gib_befehl()
    {
        return this.DATA.befehl;
    }

    public static erstellen(obj: befehl): befehl_model 
    {
        return super.erstellen(obj);
    }

}