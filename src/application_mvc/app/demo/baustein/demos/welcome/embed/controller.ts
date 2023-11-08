import { GuildMember } from "discord.js";
import template_base_controller from "../../../../../../../application/monolith/App/Controller/template_base_controller";
import Session from "../../../../../../../application/monolith/App/Session/Session";

export default class welcomeMessageController extends template_base_controller
{

    public async erhebe_daten(session: Session<any>) {
        const custom: GuildMember = session.get_data();
        this.registriere_template_variable('username', custom.user.username);
        this.registriere_template_variable('imageURL', custom.user.avatarURL());
    }

    public async vor_aufruf(session: Session<any>) {
    }

    public async nach_aufruf(session: Session<any>) {
    }


}