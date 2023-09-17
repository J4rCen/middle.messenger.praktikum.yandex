import template from "./form_authorization.hbs";
import Block from "../../utils/Block";
import {addBlur, addFocus} from "../../utils/addFocusBlurEvents";
import Input from "../input";
import Button from "../button";
import { signInData } from "../../api/authAPI";
import AuthController from "../../controllers/AuthController";


export default class FormAuthorization extends Block {
    constructor() {
        super({})
    }

    init() {
        this.children.loginInput = new Input({
            name: "login",
            class: "text-input authorization_input",
            type: "text",
            placeholder: "Логин",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        }),
        this.children.passwordInput = new Input({
            name: "password",
            class: "password-input authorization_input",
            type: "password",
            placeholder: "Пароль",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        }),
        this.children.buttonSubmit = new Button({
            class: "form_authorization_submit size_h25_w180 bg_color_50AF8A",
            label: "Вход",
            type: "submit",
            events: {
                click: () => this.onSubmit()
            }
        })
    }

    onSubmit() {
        const value = Object.values(this.children)
        .filter(child => child instanceof Input && child.getName() !== "repit_password")
        .map((child) => {
            if((child as Input).getBlock()) {
               return [(child as Input).getName(), (child as Input).getValue()]
            } else {
                alert("Не правельный ввод")
                throw new Error("Не правельный ввод")
            }
        })

        const data: signInData = Object.fromEntries(value)

        AuthController.signin(data as signInData)
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
