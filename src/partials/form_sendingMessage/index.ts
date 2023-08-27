import template from "./form_sendingMessage.hbs";
import Block from "../../utils/Block";

export default class FormSendingMessage extends Block {
    constructor() {
        super({
            buttonSend: [
                {
                    class: "main__chat__button_send_message",
                    type: "submit",
                    onClick: function(e: HTMLFormElement) {
                        e.preventDefault()
                        e.srcElement.form[0].value === "" ? alert("Сообщение не должно быть пустым") : console.log(e.srcElement.form[0].value);
                    }
                }
            ]
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
