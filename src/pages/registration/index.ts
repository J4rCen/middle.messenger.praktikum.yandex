import Block from "../../utils/Block";
import { render } from "../../utils/render";
import template from "./registration.ts";
import Handlebars from "handlebars";

export class RegistrationPage extends Block{
    static template = Handlebars.compile(template);

    constructor() {
        super({
            buttons: [
                {
                    label: "Авторизация",
                    class: "buttons-selection__authorization size_h40_w150",
                    type: "button",
                    onClick: () => {
                        render("login")
                    }
                },
                {
                    label: "Регистрация",
                    class: "buttons-selection__registration size_h40_w150 bg_color_50AF8A",
                    type: "button",
                }
            ]
        });
    }

    render() {
        return this.compile(RegistrationPage.template, this.props);
    }
}
