import template from "./input.hbs";
import Block from "../../utils/Block";

interface InputProps {
    name: string;
    type?: "text" | "password" | "email" | "number";
    class: string;
    placeholder: string;
    focus: () => void;
    blur: () => void;
    events: {
        focus: () => void;
        blur: () => void;
    }
}

export default class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                focus: props.focus,
                blur: props.blur
            }
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
