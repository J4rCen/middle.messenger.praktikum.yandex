import template from "./data_changes.hbs";
import Block from "../../utils/Block";
import {addBlur, addFocus} from "../../utils/addFocusBlurEvents";
import Input from "../input";
import Button from "../button";
import Router from "../../utils/Router";
import { inputChangeInfo } from "../inputChangeInfo/inputChangeInfo";
import UserController from "../../controllers/UserController";
import { withStore } from "../../utils/Store";

const inputChangeUser = ["login", "display_name", "first_name", "second_name", "email", "phone"]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
const inputChangeUserName: Record<string, Object<inputChangeInfo>> = {
    first_name: {messageErrorInform: "Неверно указано имя", description: "Имя:"},
    second_name: {messageErrorInform: "Неверно указана фамилия", description: "Фамилия:"},
    display_name: {messageErrorInform: "", description: "Имя в чате:"},
    login: {messageErrorInform: "Неверно указан логин", description: "Логин:"},
    email: {messageErrorInform: "Неверно указана почта", description: "Почта:"},
    phone: {messageErrorInform: "Неверно указан номер телефона", description: "Телефон:"}
}

class FormChangeDataBase extends Block {

    init() {

        this.children.changeAvatarUser =  new inputChangeInfo({
            description: "Смена аватарки:",
            input: new Input({
                name: "avatar", 
                type: "file", 
                class: "change_avatar profile-input__change-data",
            })
        }),


        

        this.children.input = inputChangeUser.map(el => {

            return new inputChangeInfo({
                ...inputChangeUserName[el],
                input: new Input({
                    name: el, 
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
            })
        })

        this.children.input.forEach(el => {
            (el.children.input as Input).setValue(this.props[(el.children.input as Input).getName()] === undefined ? "" : this.props[(el.children.input as Input).getName()])
        })
        
        

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
        (this.children.input as inputChangeInfo[]).map(el => {
            if(newProps[(el.children.input as Input).getName()] !== undefined && (el.children.input as Input).getValue() === "") {
                (el.children.input as Input).setValue(newProps[(el.children.input as Input).getName()])
            }
        })

        return false
    }
    

    onSubmit() {
        const formData = new FormData((this.children.changeAvatarUser  as Input).element?.parentNode as HTMLFormElement)

        const value = (this.children.input as inputChangeInfo[]).filter(el => (el.children.input as Input).getValue() !== "").map(el => {
            return [(el.children.input as Input).getName(), (el.children.input as Input).getValue()]
        })

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if(formData.get("avatar")?.name !== "") {
            // console.log(formData.get("avatar"))
            UserController.changeAvatar(formData)
        }


        if(value.length !== 0) {
            const data = Object.fromEntries(value)
            UserController.changeProfile(data)
        }
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withUser = withStore((state) => ({...state.user}))
export const FormChangeData = withUser(FormChangeDataBase)
