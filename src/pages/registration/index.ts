import Button from "../../partials/button";
import Block from "../../utils/Block";
import template from "./registration.hbs";
import FormRegistration from "../../partials/form_registration";
import Router from "../../utils/Router";

export class RegistrationPage extends Block{
    constructor() {
        super({});
    }

    init() {
        this.children.login = new Button({
            label: "Авторизация",
            class: "buttons-selection__authorization size_h40_w150 bg_color_8c8c8c",
            type: "button",
            events: {
                click: () => {
                    Router.go("/")
                }
            }
        })
        this.children.registration = new Button({
            label: "Регистрация",
            class: "buttons-selection__registration size_h40_w150 bg_color_50AF8A",
            type: "button",
        })
        
        this.children.formRegistration = new FormRegistration();
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
