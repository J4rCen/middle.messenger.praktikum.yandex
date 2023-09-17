import template from "./data_changes.hbs";
import Block from "../../utils/Block";
import {addBlur, addFocus} from "../../utils/addFocusBlurEvents";
import Input from "../input";
import Button from "../button";
import Router from "../../utils/Router";
import { inputChangeInfo } from "../inputChangeInfo/inputChangeInfo";
import UserController from "../../controllers/UserController";


export default class FormChangeData extends Block {

    constructor() {
        super({})
    }

    init() {

        this.children.input = [
            new inputChangeInfo({
                messageErrorInform: "Неверно указано имя",
                description: "Имя:",
                input: new Input({
                    name: "first_name", 
                    type: "text", 
                    class: "profile-input__change-data",
                    events: {
                        focus: function(e:HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e:HTMLFormElement) {
                            addBlur(e)
                        }
                    }
                })
            }),
            new inputChangeInfo({
                messageErrorInform: "Неверно указана фамилия",
                description: "Фамилия:",
                input: new Input({
                    name: "second_name", 
                    type: "text", 
                    class: "profile-input__change-data",
                    events: {
                        focus: function(e:HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e:HTMLFormElement) {
                            addBlur(e)
                        }
                    }
                })
            }),
            new inputChangeInfo({
                messageErrorInform: "",
                description: "Имя в чате:",
                input: new Input({
                    name: "display_name", 
                    type: "text", 
                    class: "profile-input__change-data",
                    events: {
                        focus: function(e:HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e:HTMLFormElement) {
                            addBlur(e)
                        }
                    }
                })
            }),
            new inputChangeInfo({
                messageErrorInform: "Неверно указан логин",
                description: "Логин:",
                input: new Input({
                    name: "login", 
                    type: "text", 
                    class: "profile-input__change-data",
                    events: {
                        focus: function(e:HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e:HTMLFormElement) {
                            addBlur(e)
                        }
                    }
                })
            }), 
            new inputChangeInfo({
                messageErrorInform: "Неверно указана почта",
                description: "Почта:",
                input: new Input({
                    name: "email", 
                    type: "email", 
                    class: "profile-input__change-data",
                    events: {
                        focus: function(e:HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e:HTMLFormElement) {
                            addBlur(e)
                        }
                    }
                })
            }),
            new inputChangeInfo({
                messageErrorInform: "Неверно указан номер телефона",
                description: "Телефон:",
                input: new Input({
                    name: "phone", 
                    type: "number", 
                    class: "profile-input__change-data",
                    events: {
                        focus: function(e:HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e:HTMLFormElement) {
                            addBlur(e)
                        }
                    }
                })
            })
        ]

        this.children.buttons = [
            new Button({
                class: "size_h25_w180 bg_color_50AF8A",
                label: "Сохранить",
                events: {
                    click: () => this.onSubmit()
                }
            }),

            new Button({
                class: "size_h25_w180 bg_color_8c8c8c",
                label: "Отмена",
                events: {
                    click: () => {
                        Router.go("/profile")
                    }
                }
            })
        ]
    }

    onSubmit() {

        const value = (this.children.input as inputChangeInfo[]).filter(el => (el.children.input as Input).getValue() !== "").map(el => {
            return [(el.children.input as Input).getName(), (el.children.input as Input).getValue()]
        })

        const data = Object.fromEntries(value)

        UserController.changeProfile(data)
    }

    render() {
        return this.compile(template, this.props)
    }
}
