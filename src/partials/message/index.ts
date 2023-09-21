import Block from "../../utils/Block";
import store from "../../utils/Store";
import template from "./message.hbs";


interface MessageProps {
    type: string;
    content: string;
    isMine: boolean;
}

export default class Message extends Block {
    constructor(props: MessageProps) {
        super({...props})
        console.log()
    }

    init() {
        
        this.props.userNik = store.getState().user.id === this.props.user_id ? store.getState().user.display_name : "Unknown"
    }

    render() {
        return this.compile(template, this.props)
    }
}
