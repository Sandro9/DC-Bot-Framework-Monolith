import ControllerInterface from "../Interfaces/Controller/ControllerInterface";
import Session from "../Session/Session";
import KannWeiterleiten from "../Traits/allgemein/KannWeiterleiten";
import base_controller from "./base_controller";


export default abstract class template_base_controller extends base_controller implements ControllerInterface
{

    public async nach_aufruf(session: Session<any>) {
        // FUnktion wird nach erhebe_daten ausgeführt
    }

}