import execution_base_controller from "./execution_base_controller";
import baustein_model from "../../Model/modul/baustein_model";
import Session from "../../Session/Session";
import SubBausteinResponse from "../../Response/subBausteinResponse";

export default class subbaustein_controller extends execution_base_controller
{
    private response: SubBausteinResponse = new SubBausteinResponse();
    /**
     * rendert das template und liefert es zurück
     * @param baustein 
     * @returns 
     */
    public async _führe_subbaustein_template_aus(session: Session<any>, baustein: baustein_model)
    {
        const controller = baustein.gib_controller();
        await controller.vor_aufruf(session);
        await controller.erhebe_daten(session)
        const data = this.response.convert_to_response(await this._führe_template_aus(baustein.gib_controller(), baustein.gib_template()));
        await controller.nach_aufruf(session, null);
        return data;
    }
}