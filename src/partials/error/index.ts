import template from "./error.hbs"
import Block from "../../utils/Block"
import Button from "../button";
import Router from "../../utils/Router";
import AuthController from "../../controllers/AuthController";


interface ErrorProps {
    error_number: string;
    error_descriptions: string;
}

export default class ErrorMessage extends Block{
    constructor(props: ErrorProps) {
        super({...props})
    }

    init() {
        this.children.buttonBack = new Button({
            label: "Назад",
            class: "size_h25_w180 bg_color_50AF8A",
            events: {
                click: () => {
                    Router.go("/")
                    AuthController.logout();
                }
            }
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
