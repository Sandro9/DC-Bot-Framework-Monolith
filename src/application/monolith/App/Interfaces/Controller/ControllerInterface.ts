import Session from "../../Session/Session";

export default interface Controller {    
    erhebe_daten(session: Session<any>);

    vor_aufruf(session: Session<any>);
    

    gib_template_variablen();

    
}