import Button from "../../partials/button";
import Block from "../../utils/Block";
import template from "./login.hbs";
import FormAuthorization from "../../partials/form_authorization";
import Router from "../../utils/Router";

export class LoginPage extends Block {
    constructor() {
        super({})
    }

    init() {
        
        this.children.login = new Button({
            label: "Авторизация",
            class: "buttons-selection__authorization size_h40_w150 bg_color_50AF8A",
        })

        this.children.registration = new Button({
            label: "Регистрация",
            class: "buttons-selection__registration size_h40_w150 bg_color_8c8c8c",
            events: {
                click: () => {
                    Router.go("/registration")
                }
            }
        })

        this.children.formAuthorization = new FormAuthorization();
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
