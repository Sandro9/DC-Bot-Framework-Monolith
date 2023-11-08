import baustein_base_controller from "../../../../../../../application/monolith/App/Controller/baustein_base_controller";
import template_base_controller from "../../../../../../../application/monolith/App/Controller/template_base_controller";
import Session from "../../../../../../../application/monolith/App/Session/Session";
import demo_model from "../../../../../../models/demo_model";

export default class welcomeMessageController extends baustein_base_controller
{

    public async erhebe_daten(session: Session<any>) {
        var demo = await (await demo_model.find({"name" : "Demo"})).at(0);
        if(!demo) {
            // es existiert noch kein demo Model
            demo = await new demo_model({"name" : "Demo", "callCount" : 0}).save();
        }

        this.registriere_template_variable("callCount",demo.callCount)

        demo.callCount++;
        await demo.save()
    }

    public async vor_aufruf(session: Session<any>) {
    }

    public async nach_aufruf(session: Session<any>) {
    }


}