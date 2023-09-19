import template from "./change_password.hbs";
import Block from "../../utils/Block";
import {addFocus, addBlur} from "../../utils/addFocusBlurEvents";
import Input from "../../partials/input"
import Button from "../button";
import Router from "../../utils/Router";
import { inputChangeInfo } from "../inputChangeInfo/inputChangeInfo";
import UserController from "../../controllers/UserController";

export default class FormChangePassword extends Block {

    init() {
        this.children.inputPassword = [
            new inputChangeInfo({
                messageErrorInform: "Неверный пароль",
                description: "Старый пароль:",
                input: new Input({
                    name: "oldPassword",
                    type:"password", 
                    class: "profile-input__change-data",
                    events: {
                        focus: function(e: HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e: HTMLFormElement) {
                            addBlur(e)
                        }
                    }
                })
            }),
            new inputChangeInfo({
                messageErrorInform: "Неверный пароль",
                description: "Новый пароль:",
                input: new Input({
                    name:"newPassword", 
                    type:"password", 
                    class:"profile-input__change-data",
                    events: {
                        focus: function(e: HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e: HTMLFormElement) {
                            addBlur(e)
                        }
                    }
                })
            }),
            new inputChangeInfo({
                messageErrorInform: "Пароли не совпадают",
                description: "Повторить новый пароль:",
                input: new Input({
                    name:"password", 
                    type:"password", 
                    class:"profile-input__change-data",
                    events: {
                        focus: function(e: HTMLFormElement) {
                            addFocus(e)
                        },
                        blur: function(e: HTMLFormElement) {
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
                        Router.go("/settings")
                    }
                }
            })
        ]
    }

    onSubmit() {
        const value = (this.children.inputPassword as inputChangeInfo[])
        .filter(el => (el.children.input as Input).getName() !== "repit_password")
        .map(el => {
            if((el.children.input as Input).getBlock()) {
                return [(el.children.input as Input).getName(), (el.children.input as Input).getValue()]
            } else {
                alert("Поля не должны быть пустыми")
                throw new Error()
            }
        })

        const data = Object.fromEntries(value)
        

        UserController.changePassword(data)

        
    }

    render() {
        return this.compile(template, {...this.props})
    }
}
