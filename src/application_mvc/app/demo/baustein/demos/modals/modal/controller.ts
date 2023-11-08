import baustein_base_controller from "../../../../../../../application/monolith/App/Controller/baustein_base_controller";
import template_base_controller from "../../../../../../../application/monolith/App/Controller/template_base_controller";
import Session from "../../../../../../../application/monolith/App/Session/Session";

/**
 * @override KannDateienLaden
 */
export default class welcomeMessageController extends baustein_base_controller
{

    public async erhebe_daten(session: Session<any>) {

    }

    public async vor_aufruf(session: Session<any>) {
        
    }

    public async nach_aufruf(session: Session<any>) {
    }


}