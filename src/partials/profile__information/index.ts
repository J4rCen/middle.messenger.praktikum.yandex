import Block from "../../utils/Block";
import template from "./profile__information.hbs";

interface ProfileInformationProps {
    class: string
    descriptions: string,
    information: string
}

export default class ProfileInformation extends Block {
    constructor(props: ProfileInformationProps) {
        super({
            ...props
        })
    }
    render() {
        return this.compile(template, this.props);
    }
}
