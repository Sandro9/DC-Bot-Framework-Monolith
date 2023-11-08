import dao_befehl from "../../App/dao/dao_befehl";
import model_interface from "../../App/Interfaces/Models/model_interface";
import modelType from "../../App/types/model/modelType";
import model from "../../App/Model/model";

type modelTyp = {
    "name" : string,
    "age" : number,
    "profession" : string
}

export default class model1 extends model implements model_interface
{
    public static BEREICH: string = "test";
    protected static INDICES: string[] = [
        "name"
    ];
    protected static UNIQUE_INDICES: string[] = [
        "profession"
    ];
    protected DAO_CONTROLLER = new dao_befehl();
    protected _SAVE_TO_DB: boolean = true;

    private constructor(obj: modelType){
        super(obj);
    }

    public static async erstellen(obj: modelType, autosave = true): Promise<model1>
    {
        return super.erstellen(obj, autosave);
    }
}