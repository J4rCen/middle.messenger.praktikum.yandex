import Block from "../../utils/Block";
import { render } from "../../utils/render";
import template from "./login.ts";
import Handlebars from "handlebars";



export class LoginPage extends Block {
    static template = Handlebars.compile(template)

    constructor() {
        super({
            buttons: [
                {
                    label: "Авторизация",
                    class: "buttons-selection__authorization size_h40_w150 bg_color_50AF8A",
                    type: "button",
                },
                {
                    label: "Регистрация",
                    class: "buttons-selection__registration size_h40_w150",
                    type: "button",
                    onClick: () => {
                        render("registration")
                    }
                }
            ]
        })
    }

    render() {
        return this.compile(LoginPage.template, this.props);
    }
}
