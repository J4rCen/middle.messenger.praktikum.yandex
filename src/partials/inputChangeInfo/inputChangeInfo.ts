import Block from "../../utils/Block";
import Input from "../input";
import template from "./inputChangeInfo.hbs"

export interface inputChangeInfoProps {
    messageErrorInform?: string,
    description: string,
    input: Input;
}

export class inputChangeInfo extends Block<inputChangeInfoProps> {

    constructor(props: inputChangeInfoProps) {
        super({...props})
    }

    render() {
        return this.compile(template, this.props) 
    }
}
