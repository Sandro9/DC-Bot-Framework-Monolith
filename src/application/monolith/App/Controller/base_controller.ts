import Session from "../Session/Session";
import KannWeiterleiten from "../Traits/allgemein/KannWeiterleiten";

export default abstract class base_controller {
    private template_variablen = {};
    private kannWeiterleiten: KannWeiterleiten = new KannWeiterleiten();

    public gib_template_variablen()
    {
        return this.template_variablen;
    }

    /**
     * @param name string
     * @param data any
     */
    public registriere_template_variable(name: string, data: any)
    {
        this.template_variablen[name] = data;
    }

    public async weiterleiten(befehlName: string, session: Session<any>)
    {
        await this.kannWeiterleiten.weiterleiten(befehlName, session)
    }

    public async erhebe_daten(session: Session<any>) {
        // Funktion zum laden der Template Variablen
    }

    public async vor_aufruf(session: Session<any>) {
        // Funktion wird vor erhebe_Daten ausgeführt
    }

}