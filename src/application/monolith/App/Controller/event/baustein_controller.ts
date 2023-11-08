import execution_base_controller from "./execution_base_controller";
import baustein_model from "../../Model/modul/baustein_model";
import subbaustein_controller from "./subbaustein_controller";
import Session from "../../Session/Session";
import KannResponse from "../../Traits/response/KannResponse";
import BausteinResponse from "../../Response/bausteinResponse";

export default class baustein_controller extends execution_base_controller
{
    private subbaustein_controller = new subbaustein_controller();
    private kannResponse : KannResponse = new KannResponse();
    private response : BausteinResponse = new BausteinResponse();


    /**
     * rendert die template und baut gültige Response objekte
     * @param baustein 
     */
    public async _führe_baustein_template_aus(session: Session<any>, baustein: baustein_model)
    {

        const controller = baustein.gib_controller()
        controller.setze_response_komponente_zurück();
        await controller.vor_aufruf(session);
        await controller.erhebe_daten(session);
        const template_rendered = await this._führe_template_aus(
            baustein.gib_controller(),
            baustein.gib_template()
        )

        const bausteine = this._ermittle_bausteine(template_rendered, "baustein");
        // führe die Subbausteine aus
        let data = [];
        for (const i in bausteine){
            const baustein = bausteine[i];
            data.push(await this.subbaustein_controller._führe_subbaustein_template_aus(session, baustein));
        }

        const extra = controller.gib_response_komponenten();
        if(extra) data = data.concat(extra);
        const responseDaten = this.response.convertiere_data_zu_response(data);
        const response = await this.kannResponse._sende_response(session,template_rendered, responseDaten);
        await controller.nach_aufruf(session, response);
    }

    
}