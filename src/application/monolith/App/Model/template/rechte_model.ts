import dao_rechte from "../../dao/dao_rechte";
import ModelInterface from "../../Interfaces/Models/model_interface";
import modelType from "../../types/model/modelType";
import model from "../model";

interface rechte extends modelType {
    "rechte": any,
    "showError": any
}

export default class rechte_model extends model implements ModelInterface
{
    public static BEREICH: string = "rechte";
    protected DAO_CONTROLLER = new dao_rechte();

    private constructor(obj: rechte){
        super(obj);
    }


    public gib_rechte()
    {
        return this.gib_data_attribut('rechte');
    }

    public static erstellen(obj: rechte): rechte_model
    {
        return super.erstellen(obj);
    }

}