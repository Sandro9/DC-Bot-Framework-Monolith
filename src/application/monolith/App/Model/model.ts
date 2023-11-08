import Dao_Base from "../dao/dao_base";
import InvalidImplementation from "../Exceptions/InvalidImplementation";
import Dao from "../Interfaces/Models/dao_interface";
import modelType from "../types/model/modelType";

var dao_base = new Dao_Base();

export default abstract class model 
{
    protected DAO_CONTROLLER : Dao = new Dao_Base(); // wird von der model Klasse überschrieben

    protected DATA: any = {}; // Daten die im Model gespeichert werden sollen

    protected _ID: string; // model ID

    protected static BEREICH : string = null; // wird von der model Klasse überschrieben

    protected static INDICES: string[] = []; // notwendig um im Cache Indices zu setzen um die Models einfacher zu finden
    protected static UNIQUE_INDICES: string[] = []; // notwendig um im Cache Indices zu setzen, die einmalig vergeben werden

    protected _many = {}; // n Beziehungen
    protected _one = {}; // 1 zu 1 Beziehungen

    protected constructor(obj: any){}

    /**
     * 
     * @param data konfiguration zum erstellen des Models
     * @param autosave soll das Model autom. beim erstellen gespeichert werden 
     * @returns gibt ein gültiges modl zurück
     */
    public static erstellen(data: modelType, autosave = true): any
    {
        // @ts-ignore: das ist ok
        const instance: model = new this(data);
        
        instance.DATA._bereich = this.BEREICH;
        instance._fill(data);

        if(autosave)
        {
            instance.speichern();
        }

        return instance;
    }

    /**
     * lädt ein Model anhand der ID und des Bereiches (MODEL.BEREICH verwenden!)
     * @param ID ModelID
     * @returns gibt ein gültiges model zurück oder wirft eine Exception
     */
    public static laden(ID : string, bereich = null)
    {
        return dao_base.getById(ID, bereich ?? this.BEREICH); 
    }

    /**
     * lädt Models anhand des festgelegten indices
     * @param indice_name 
     * @param indice_value 
     */
    public static laden_indice(indice_name, indice_value, bereich = null) : {[ID: string]: any}
    {
        const IDs = dao_base.get_indice(bereich ?? this.BEREICH,indice_name, indice_value);
        if(!IDs) return null;
        var models = {};
        Object.keys(IDs).forEach((ID) => {
            models[ID] = model.laden(ID, bereich ?? this.BEREICH)
        })
        return models;
    }

    /**
     * lädt ein unique Model anhand des festgelegten indices
     * @param indice_name 
     * @param indice_value 
     */
     public static laden_unique_indice(indice_name, indice_value, bereich = null)
     {
         const ID = dao_base.get_unique_indice(bereich ?? this.BEREICH,indice_name, indice_value);
         if(!ID) return null;
         return model.laden(ID, bereich ?? this.BEREICH)
     }

    public loeschen()
    {
        dao_base.deleteById(this.gib_datensatz_id(), this);
    }

     /**
     * speichert das aktuelle Model
     * legt bei nichtvorhandensein der ID ein neues Model in der DB und im Cache an
     */
    public speichern()
    {

        this.pre_save();
        
        if(this._ID)
        {
            this.DAO_CONTROLLER.update(this);
        } else {
            this.DAO_CONTROLLER.save_new(this);
            this.DAO_CONTROLLER.indices_anlegen(this);
            this.DAO_CONTROLLER.unique_indices_anlegen(this);
        }
        this.after_save();
    }

    protected gib_data_attribut(name)
    {
        return this.DATA[name];
    }

    /**
     * Gibt alle Datensätze eines Bereiches.
     * @param bereich Am besten model.BEREICH verwenden!
     * @returns 
     */
    public static gib_alle_datensätze(bereich = null)
    {
        return dao_base.getAll(bereich ?? this.BEREICH);
    }

    /**
     * Gibt die Interne ID
     * @returns 
     */
    public gib_datensatz_id(): any
    {
        return this._ID;
    }

    /**
     * gibt den Bereich des Models aus z.B. event, baustein...
     * @returns 
     */
    public gib_bereich()
    {
        return this.DATA._bereich;
    }

    /**
     * gibt die Indice Namen eines Models zurück
     * @returns 
     */
    public gib_indices(): string[]
    {
        //@ts-ignore
        return this.constructor.INDICES;
    }

    public gib_unique_indices(): string[]
    {
        //@ts-ignore
        return this.constructor.UNIQUE_INDICES;
    }

    /**
     * 1 zu 1 Beziehung
     * @param modl 
     */
    public has_one(modl: model, twoWayBinding: boolean = true)
    {
        this._one[modl.gib_bereich()] = modl.gib_datensatz_id();
        if(twoWayBinding) modl._one[this.gib_bereich()] = this.gib_datensatz_id();
    
    }

    public gib_one(bereich: string)
    {
        return model.laden(this._one[bereich], bereich)
    }

    public gib_many(bereich: string)
    {
        const ids = this._many[bereich];
        let models = {};
        Object.keys(ids).forEach(id => {
            models[id] = model.laden(ids[id], bereich);
        })
        return models;
    }

    /**
     * n zu n Beziehung
     * @param modl 
     */
    public has_many(modl : model, twoWayBinding: boolean = true)
    {
        if(!this._many[modl.gib_bereich()]) this._many[modl.gib_bereich()] = {};
        this._many[modl.gib_bereich()][modl.gib_datensatz_id()] = modl.gib_datensatz_id();

        if(!twoWayBinding) return;
        
        if(!modl._many[this.gib_bereich()]) modl._many[this.gib_bereich()] = {};
        modl._many[this.gib_bereich()][this.gib_datensatz_id()] = this.gib_datensatz_id();
    }

    /**
     * n zu 1 Beziehung
     * @param modl 
     */
    public has_many_one(modl : model, twoWayBinding: boolean = true)
    {
        if(!this._one[modl.gib_bereich()]) this._one[modl.gib_bereich()] = {};
        this._one[modl.gib_bereich()][modl.gib_datensatz_id()] = modl.gib_datensatz_id();

        if(!twoWayBinding) return;

        if(!modl._many[this.gib_bereich()]) modl._many[this.gib_bereich()] = {};
        modl._many[this.gib_bereich()][this.gib_datensatz_id()] = this.gib_datensatz_id();
    }

    /**
     * 1 zu n Beziehung
     * @param modl 
     */
    public has_one_many(modl : model, twoWayBinding: boolean = true)
    {
        if(!this._many[modl.gib_bereich()]) this._many[modl.gib_bereich()] = {};
        this._many[modl.gib_bereich()][modl.gib_datensatz_id()] = modl.gib_datensatz_id();

        if(!twoWayBinding) return;

        if(!modl._one[this.gib_bereich()]) modl._one[this.gib_bereich()] = {};
        modl._one[this.gib_bereich()][this.gib_datensatz_id()] = this.gib_datensatz_id();
    }

    public _gib_one_raw()
    {
        return this._one;
    }

    public _gib_many_raw()
    {
        return this._many;
    }

    /**
     * Kann von Kind Überschrieben werden
     */
    protected pre_save(){}
    protected after_save(){}

    // nicht ausführen!!!!!!! darf nur einmalig beim speichern verändert werden
    public _update_ID(ID)
    {
        this._ID = ID;
    }

    public _gib_data()
    {
        return this.DATA;
    }

    private _fill(autofillData: modelType)
    {
        Object.keys(autofillData).forEach((keyName) => {
            this.DATA[keyName] = autofillData[keyName];
        });
    }
}