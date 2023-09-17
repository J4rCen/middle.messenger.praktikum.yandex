import template from "./form_registration.hbs";
import Block from "../../utils/Block";
import {addBlur, addFocus} from "../../utils/addFocusBlurEvents";
import Input from "../input";
import Button from "../button";
import AuthController  from "../../controllers/AuthController";
import { signUpData } from "../../api/authAPI";


export default class FormRegistration extends Block {
    constructor() {
        super({}) 
    }

    init() {
        this.children.inputFirstName = new Input({
            name: "first_name",
            class: "text-input authorization_input", 
            type:"text", 
            placeholder:"Имя",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        })
        this.children.inputSecondName = new Input({
            name: "second_name",
            class: "text-input authorization_input", 
            type:"text", 
            placeholder:"Фамилия",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        })
        this.children.inputLogin = new Input({
            name: "login",
            class: "text-input authorization_input", 
            type:"text", 
            placeholder:"Логин",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        })
        this.children.inputEmail = new Input({
            name: "email",
            class: "email-input authorization_input", 
            type:"email", 
            placeholder:"Почта",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        })
        this.children.emailPhone = new Input({
            name: "phone",
            class: "phone_number-input authorization_input", 
            type:"number", 
            placeholder:"Номер телефона",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        })
        this.children.inputPassword = new Input({
            name: "password",
            class: "password-input authorization_input", 
            type:"password", 
            placeholder:"Пароль",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        })
        this.children.inputRepitPassword = new Input({
            name: "repit_password",
            class: "password-input authorization_input", 
            type:"password", 
            placeholder:"Потверждения пароля",
            events: {
                focus: function(e: HTMLFormElement) {
                    addFocus(e)
                },
                blur: function(e: HTMLFormElement) {
                    addBlur(e)
                }
            }
        })
        this.children.buttonSubmit = new Button({
            class: "authorization_buttons size_h25_w180 bg_color_50AF8A",
            label: "Зарегистрироваться",
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

        const data: signUpData = Object.fromEntries(value)

        AuthController.signup(data as signUpData)
        
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
