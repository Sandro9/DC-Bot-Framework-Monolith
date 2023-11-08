import model from "../../Model/model";

export default interface model_interface 
{
    gib_datensatz_id();
    gib_bereich();
    has_one(model: model);
    gib_one(bereich: string);
    gib_many(bereich: string);
    has_many(modl : model);
    has_one_many(modl : model);
    has_many_one(modl : model);
    

}