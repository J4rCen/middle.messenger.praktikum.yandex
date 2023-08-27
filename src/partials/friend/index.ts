import Block from "../../utils/Block";
import template from "./friend.hbs";

interface FriendProps {
    avatar: string;
    login_friend: string;
    message_friend: string;
    message_date: string;
    missed_quantity: number;
}

export default class Friend extends Block {
    constructor(props: FriendProps) {
        super({
            ...props
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
