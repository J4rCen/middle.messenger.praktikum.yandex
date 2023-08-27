import template from "./input.hbs";
import Block from "../../utils/Block";

interface InputProps {
    name: string;
    type?: "text" | "password" | "email" | "number";
    class: string;
    placeholder: string;
}

export default class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
