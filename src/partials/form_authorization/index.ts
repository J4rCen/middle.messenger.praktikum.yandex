import template from "./form_authorization.hbs";
import Block from "../../utils/Block";
import dataFillingForm from "../../utils/dataFillingForm";
import {addBlur, addFocus} from "../../utils/addFocusBlurEvents";
import { render } from "../../utils/render";


export default class FormAuthorization extends Block {
    constructor() {
        super({
            loginInput: [
                {
                    focus: function(e: HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e: HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            passwordInput: [
                {
                    focus: function(e: HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e: HTMLFormElement) {
                        addBlur(e)
                    }
                }
                
            ],
            buttonAuthor: [
                {
                    class: "form_authorization_submit size_h25_w180 bg_color_50AF8A",
                    label: "Вход",
                    type: "submit",
                    onClick: function(e: HTMLFormElement) {
                        e.preventDefault()

                        if(dataFillingForm(e.srcElement.form) !== undefined ) {
                            console.log(dataFillingForm(e.srcElement.form))
                            render("menu")
                        } else {
                            alert("Проверте правельность ввода")
                        }
                    },
                }
            ], 
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
