import ControllerInterface from "../Interfaces/Controller/ControllerInterface";
import baustein_response_interface from "../Interfaces/Response/baustein_response_interface";
import Session from "../Session/Session";
import KannWeiterleiten from "../Traits/allgemein/KannWeiterleiten";
import base_controller from "./base_controller";

interface response {
    'DM' : string[],
    'CHANNEL' : string[],
    'REPLY' : string[],
}

export default abstract class baustein_base_controller extends base_controller implements ControllerInterface
{
    private responseData: baustein_response_interface[] = [];

    public füge_response_komponente_hinzu(data: baustein_response_interface)
    {
        this.responseData.push(data);
        
    }

    public gib_response_komponenten(): baustein_response_interface[]
    {
        return this.responseData;
    }


    public async nach_aufruf(session: Session<any>, response: response) {
        // FUnktion wird nach erhebe_daten ausgeführt
    }

    public setze_response_komponente_zurück()
    {
        this.responseData = [];
    }

}