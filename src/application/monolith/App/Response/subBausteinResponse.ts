import { ActionRowBuilder, ModalBuilder } from "discord.js"
import ButtonAdapter from "../adapter/buttonAdapter"
import EmbedAdapter from "../adapter/embedAdapter"
import ModalAdapter from "../adapter/modalAdapter"
import SelectmenuAdapter from "../adapter/selectmenuAdapter"
import TextAdapter from "../adapter/textAdapter"
import TextinputAdapter from "../adapter/textinputAdapter"
import baustein_response_interface from "../Interfaces/Response/baustein_response_interface"
import KannButtons from "../Traits/response/KannButtons"
import KannEmbeds from "../Traits/response/KannEmbeds"
import KannModals from "../Traits/response/KannModals"
import KannSelectmenus from "../Traits/response/KannSelectmenus"
import KannTextinputs from "../Traits/response/KannTextinputs"

export default class SubBausteinResponse {

    private kannButtons: KannButtons = new KannButtons()
    private kannEmbeds: KannEmbeds = new KannEmbeds()
    private kannModals: KannModals = new KannModals()
    private kannTextinputs: KannTextinputs = new KannTextinputs()
    private kannSelectmenus: KannSelectmenus = new KannSelectmenus()

    private embedAdapter = new EmbedAdapter();
    private selectmenuAdapter = new SelectmenuAdapter();
    private buttonAdapter = new ButtonAdapter();
    private textinputAdapter = new TextinputAdapter();
    private modalAdapter = new ModalAdapter();
    private textAdapter = new TextAdapter();

    public convert_to_response(baustein: any): baustein_response_interface
    {
        var data = null;
        baustein = baustein.baustein;

        if(baustein.typ[0] == 'embed')
        {
            data = this._erstelle_embed(baustein);
        } else if(baustein.typ[0] == 'selectmenu') {
            data = this._erstelle_select(baustein);
        } else if(baustein.typ[0] == 'button') {
            data = this._erstelle_button(baustein);
        } else if(baustein.typ[0] == 'text') {
            data = this._erstelle_text(baustein);
        } else if(baustein.typ[0] == 'textinput') {
            data = this._erstelle_textinput(baustein);
        } else if(baustein.typ[0] == 'modal') {
            data = this._erstelle_modal(baustein);
        }

        return {
            'name' : baustein.typ[0],
            'data' : data,
        }
    }

    private _erstelle_modal(modalData)
    {
        const converted = this.modalAdapter.convertieren(modalData);
        return this.kannModals.create(converted);
    }

    private _erstelle_textinput(inputData)
    {
        const converted = this.textinputAdapter.convertieren(inputData);
        return this.kannTextinputs.create(converted);
    }

    private _erstelle_text(textData)
    {
        return this.textAdapter.convertieren(textData);
    }

    private _erstelle_embed(embedData)
    {
        const converted = this.embedAdapter.convertieren(embedData);
        return this.kannEmbeds.create(converted);
    }

    private _erstelle_select(selectData)
    {
        const converted = this.selectmenuAdapter.convertieren(selectData);
        return this.kannSelectmenus.create(converted);
    }

    private _erstelle_button(buttonData)
    {
        const converted = this.buttonAdapter.convertieren(buttonData);
        return this.kannButtons.create(converted);
    }
}