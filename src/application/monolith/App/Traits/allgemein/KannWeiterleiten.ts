import event_controller from "../../Controller/event/event_controller";
import Redirect from "../../Exceptions/Redirect";
import event_model from "../../Model/modul/event_model";
import befehl_model from "../../Model/template/befehl_model";

export default class KannWeiterleiten
{
    public async weiterleiten(befehlName, session){
        const controller = new event_controller();
        const befehlModl: befehl_model = befehl_model.laden_unique_indice('befehlID',befehlName)
        const eventModl = befehlModl.gib_one(event_model.BEREICH);
        await controller.run(session, eventModl);
        throw new Redirect(); // todo umbauenTe
    }
}