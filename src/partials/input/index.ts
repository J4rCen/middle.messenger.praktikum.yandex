import template from "./input.hbs";
import Block from "../../utils/Block.ts";

interface InputProps {
    name: string;
    type?: "text" | "password" | "email" | "number" | "file";
    class: string;
    placeholder?: string;
    events?: {
        focus?: (e: HTMLFormElement) => void;
        blur?: (e: HTMLFormElement) => void;
        keydown?: (e: HTMLFormElement) => void;
    }
}

export default class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super({...props})
    }


    public getName() {
        return (this.element as HTMLInputElement).name;
    }

    public getValue() {
        return (this.element as HTMLInputElement).value;
    }

    public setValue(value: string) {
        return (this.element as HTMLInputElement).value = value;
    }
    
    public getBlock() {
        if(this.element?.parentNode?.children[0].classList.value.match(/hide/) !== null && this.getValue() !== "") {
            return true
        } else {
            return false
        } 
    }

    render() {
        return this.compile(template, {...this.props})
    }
}
