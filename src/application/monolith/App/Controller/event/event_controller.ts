import Redirect from "../../Exceptions/Redirect";
import model from "../../Model/model";
import baustein_model from "../../Model/modul/baustein_model";
import event_model from "../../Model/modul/event_model";
import rechte_model from "../../Model/template/rechte_model";
import Session from "../../Session/Session";
import baustein_controller from "./baustein_controller";
import execution_base_controller from "./execution_base_controller";

export default class event_controller extends execution_base_controller
{
    protected mdl: model;
    private baustein_controller = new baustein_controller();

    public async run(session: Session<any>, mdl : event_model)
    {

        this.mdl = mdl;

        // todo hier auf Rechte prüfen! sonst sofort return
        this._führe_event_template_aus(session,mdl).catch(e => {
            if(e instanceof Redirect) {
            } else {
                console.log(e)
            }
        });
    }

    private async _führe_event_template_aus(session: Session<any>, mdl: event_model)
    {
        // starte den base controller
        const controller = mdl.gib_controller();
        await controller.vor_aufruf(session);
        await controller.erhebe_daten(session);
        const template_rendered = await this._führe_template_aus(
            mdl.gib_controller(),
            mdl.gib_template()
        );
        var bausteine = null;
        if(template_rendered.template.rechte){
            const rechte = session.get_roles() ?? [];
            if(!this._prüfe_rechte(rechte, template_rendered.template.rechte[0])) {
                if(!template_rendered.template.rechte[0].bausteine) return;
                bausteine = await this._gib_bausteine_aus_pfad_array(template_rendered.template.rechte[0].bausteine[0].baustein)
            } else {
                bausteine = await this._ermittle_bausteine(template_rendered);
            }
        } else {
            bausteine = await this._ermittle_bausteine(template_rendered);
        }

        
        // führe die Bausteine aus
        for(const i in bausteine) {
            const baustein = bausteine[i];
            await this.baustein_controller._führe_baustein_template_aus(session, baustein)
        };
        await controller.nach_aufruf(session); 
    }

    private _prüfe_rechte(user_rechte: string[], template_rechte: any): boolean
    {
        for(const template_recht of  template_rechte.options[0].recht) {
            if(user_rechte.find((user_recht) => user_recht == template_recht )) return true;
        };
        return false;
    }
}