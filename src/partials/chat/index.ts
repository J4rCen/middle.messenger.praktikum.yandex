import template from "./chat";
import Block from "../../utils/Block";
import Handlebars from "handlebars";

export default class ChatPage extends Block {
    static template = Handlebars.compile(template);

    constructor() {
        super({
            messagesPage: [
                {
                    type: "outgoing",
                    messag: "Hello"
                }
            ]
        })
    }

    render() {
        return this.compile(ChatPage.template, this.props)
    }
}
