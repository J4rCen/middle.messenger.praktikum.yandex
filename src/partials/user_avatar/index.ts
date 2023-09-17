import Block from "../../utils/Block";
import template from "./user_avatar.hbs"
import Image from "../image";


interface UserAvatarProps {
    image: Image
}

export default class UserAvatar extends Block {

    constructor(props: UserAvatarProps) {
        super(props)
    }

    render() {
        return this.compile(template, this.props)
    }
}
