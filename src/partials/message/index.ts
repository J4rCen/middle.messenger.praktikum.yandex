import Block from "../../utils/Block";
import template from "./message.hbs";

interface MessageProps {
    type: string;
    messag: string;
}

export default class Message extends Block {
    constructor(props: MessageProps) {
        super({
            ...props
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
