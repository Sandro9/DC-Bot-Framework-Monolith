import baustein_base_controller from "../../../../../../application/monolith/App/Controller/baustein_base_controller";
import template_base_controller from "../../../../../../application/monolith/App/Controller/template_base_controller";
import Session from "../../../../../../application/monolith/App/Session/Session";

/**
 * @override KannDateienLaden
 */
export default class welcomeMessageController extends baustein_base_controller
{

    public async erhebe_daten(session: Session<any>) {
        this.registriere_template_variable("CHANNELID", '1040738285909188661');
        this.registriere_template_variable("DM", '1040737818160398357');

        this.füge_response_komponente_hinzu({
            'name' : "content",
            "data" : "Hallo Welt!"
        })
        //this.weiterleiten('weiterleitenDemo')
    }

    public async vor_aufruf(session: Session<any>) {
        
    }

    public async nach_aufruf(session: Session<any>) {
    }


}