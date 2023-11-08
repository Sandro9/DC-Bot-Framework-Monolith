import model from "../App/Model/model";

export default class Cache 
{
    private static Cache: Cache;

    private daten: any = {}; // hier wird alles temporär gespeichert!
    private indices: any = {}; // hier werden indecies gespeichert!
    private unique_indices: any = {}; // hier werden unique indecies gespeichert!
    // schema : modulID, bereich(event,rechte..), indice_name, indice_value : model

    private constructor(){}

    public static create()
    {
        if(this.Cache) return this.Cache;
        this.Cache = new Cache(); 
        return this.Cache;
    }

    public finden(index: string, bereich: string)
    {
        return this.daten[bereich][index];
    }

    public indice_finden(bereich: string, indice_name: string, indice_value: string)
    {
        if(!this.indices[bereich]) return null;
        if(!this.indices[bereich][indice_name]) return null;
        if(!this.indices[bereich][indice_name][indice_value]) return null;
        return this.indices[bereich][indice_name][indice_value];
    }

    public unique_indice_finden(bereich: string, indice_name: string, indice_value: string) 
    {
        if(!this.unique_indices[bereich]) return null;
        if(!this.unique_indices[bereich][indice_name]) return null;
        if(!this.unique_indices[bereich][indice_name][indice_value]) return null;
        return this.unique_indices[bereich][indice_name][indice_value];
    }

    public gib_alle(bereich: string)
    {
        return this.daten[bereich];
    }

    public eintragen(bereich: string, index: string, daten: any)
    {
        if(!this.daten[bereich]) this.daten[bereich] = {};
        this.daten[bereich][index] = daten;
    }

    public eintragen_mehrere(bereich, index, datenArray)
    {
        if(!this.daten[bereich]) this.daten[bereich] = {};
        datenArray.forEach(e => {
            this.daten[bereich][index] = e;
        })
    }

    public indice_setzen(bereich: string, indice_name: string, indice_value: string, model: model)
    {
        if(!this.indices[bereich]) this.indices[bereich] = {};
        if(!this.indices[bereich][indice_name]) this.indices[bereich][indice_name] = {};
        if(!this.indices[bereich][indice_name][indice_value]) this.indices[bereich][indice_name][indice_value] = {}
        this.indices[bereich][indice_name][indice_value][model.gib_datensatz_id()] = model.gib_datensatz_id();
    }

    public unique_indice_setzen(bereich: string, indice_name: string, indice_value: string, model: model)
    {
        if(!this.unique_indices[bereich]) this.unique_indices[bereich] = {};
        if(!this.unique_indices[bereich][indice_name]) this.unique_indices[bereich][indice_name] = {};
        this.unique_indices[bereich][indice_name][indice_value] = model.gib_datensatz_id();
    }

    public loeschen(index: string, model: model)
    {
        const bereich = model.gib_bereich();
        const indices = model.gib_indices();
        const unique_indices = model.gib_unique_indices();

        indices.forEach((indice_name) => {
            delete this.indices[bereich][indice_name][model._gib_data()[indice_name]][index];
            if(this.indices[bereich][indice_name].length == 0) delete this.indices[bereich][indice_name];
        });

        unique_indices.forEach((indice_name) => {
            delete this.unique_indices[bereich][indice_name][model._gib_data()[indice_name]];
        });

        delete this.daten[bereich][index];
    }
}