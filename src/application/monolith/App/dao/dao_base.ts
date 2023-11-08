import Cache from "../../Cache/Cache"
import model from "../Model/model";

globalThis.IDcount = 0;

export default class dao_base
{

    private cache = Cache.create();

    public update(obj: model)
    {
        this.cache.eintragen(
            obj.gib_bereich(),
            obj.gib_datensatz_id(),
            obj
        );
    }

    public async save_new(obj: model)
    {
        
        globalThis.IDcount++; // todo weg damit und stattdessen string von DB nehmen ( falls vorhanden )

        const ID = globalThis.IDcount;
        obj._update_ID(ID);
        this._write_to_cache(obj);
    }


    public indices_anlegen(obj: model)
    {
        obj.gib_indices().forEach((indice_name,idx) => {
            this.cache.indice_setzen(
                obj.gib_bereich(),
                indice_name,
                obj._gib_data()[indice_name],
                obj
            )
        });
    }

    public unique_indices_anlegen(obj: model)
    {
        obj.gib_unique_indices().forEach((indice_name,idx) => {
            this.cache.unique_indice_setzen(
                obj.gib_bereich(),
                indice_name,
                obj._gib_data()[indice_name],
                obj
            )
        });
    }

    public get_indice(bereich: string,indice_name: string, indice_value: string)
    {
        return this.cache.indice_finden(bereich,indice_name,indice_value);
    }

    public get_unique_indice(bereich: string,indice_name: string, indice_value: string) 
    {
        return this.cache.unique_indice_finden(bereich,indice_name,indice_value);
    }

    public getById(ID: string, bereich : string)
    {
        return this.cache.finden(ID, bereich);
    }

    public getAll(bereich: string)
    {
        return this.cache.gib_alle(bereich);
    }

    public deleteById(ID: string, obj: model)
    {
        this.cache.loeschen(ID, obj);
    }

    private _write_to_cache(obj: model)
    {
        this.cache.eintragen(
            obj.gib_bereich(),
            obj.gib_datensatz_id(),
            obj
        );
    }
}