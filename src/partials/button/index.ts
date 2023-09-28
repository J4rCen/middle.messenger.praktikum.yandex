import template from "./button.hbs";
import Block from "../../utils/Block.ts";

interface ButtonProps {
    label?: string;
    class?: string;
    type?: string;
    events?: {
        click?: (e: HTMLFormElement) => void;
    };
}

export default class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({...props, type: "button"})
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
