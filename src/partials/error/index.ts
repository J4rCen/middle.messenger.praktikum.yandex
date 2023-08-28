import template from "./error.hbs"
import Block from "../../utils/Block"
import { render } from "../../utils/render";

interface ErrorProps {
    error_number: string;
    error_descriptions: string;
}

export default class ErrorMessage extends Block{
    constructor(props: ErrorProps) {
        super({
            ...props,
            buttonBack: [
                {
                    onClick: () => {
                        render("login")
                    }
                }
            ]
        })
    }
    render() {
        return this.compile(template, this.props)
    }
}
