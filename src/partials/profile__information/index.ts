import Block from "../../utils/Block";
import template from "./profile__information.hbs";

interface ProfileInformationProps {
    descriptions: string | number | undefined,
    information: string | number | undefined,
}

export default class ProfileInformation extends Block<ProfileInformationProps> {
    constructor(props: ProfileInformationProps) {
        super(props)
    }
    render() {
        return this.compile(template, this.props);
    }
}
