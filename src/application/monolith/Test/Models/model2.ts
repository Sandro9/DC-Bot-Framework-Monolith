import dao_befehl from "../../App/dao/dao_befehl";
import model_interface from "../../App/Interfaces/Models/model_interface";
import modelType from "../../App/types/model/modelType";
import model from "../../App/Model/model";


export default class model2 extends model implements model_interface
{
    public static BEREICH: string = "test2";
    protected _SAVE_TO_DB: boolean = true;
    protected DAO_CONTROLLER = new dao_befehl();



    private constructor(obj: modelType){
        super(obj);
    }

    public static async erstellen(obj: modelType, autosave = true): Promise<model2>
    {
        return super.erstellen(obj, autosave);
    }
}