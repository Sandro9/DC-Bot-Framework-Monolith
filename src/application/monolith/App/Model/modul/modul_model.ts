import dao_baustein from "../../dao/dao_baustein";
import modelType from "../../types/model/modelType";
import model from "../model";

interface modul extends modelType {
    name : string,
    bausteinPfad : string,
    seitenPfad : string,
    rootPfad : string,
}

export default class modul_model extends model
{

    public static BEREICH: string = "modul";
    protected DAO_CONTROLLER = new dao_baustein();

    protected IGNORE_EMPTY_CONTROLLER = true;

    private constructor(obj: modul){
        super(obj);
    }

    public gib_baustein_pfad(): string
    {
        return this.DATA.bausteinPfad;
    }

    public gib_seiten_pfad(): string    
    {
        return this.DATA.seitenPfad;
    }

    public gib_root_pfad(): string
    {
        return this.DATA.rootPfad;
    }

    public static erstellen(obj: modul): modul_model
    {
        return super.erstellen(obj);
    }
    

    public gib_name()
    {
        return this.DATA.name;
    }
}