import template from "./change_password.hbs";
import Block from "../../utils/Block";
import {addFocus, addBlur} from "../../utils/addFocusBlurEvents";
import dataFillingForm from "../../utils/dataFillingForm";
import { render } from "../../utils/render";

export default class FormChangePassword extends Block {

    constructor() {
        super({
            oldPassword: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            newPassword: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            repitPassword: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            buttons: [
                {
                    class: "size_h25_w180 bg_color_50AF8A",
                    label: "Сохранить",
                    type: "submit",
                    onClick: function(e: HTMLFormElement) {
                        e.preventDefault()

                        if(dataFillingForm(e.srcElement.form) !== undefined ) {
                            console.log(dataFillingForm(e.srcElement.form))
                        } else {
                            alert("Проверте правельность ввода")
                        }
                    },
                },
                {
                    class: "size_h25_w180 bg_color_50AF8A",
                    label: "Отмена",
                    onClick: () => {
                        render("profile")
                    }
                }
            ]
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
