import template from "./form_registration.hbs";
import Block from "../../utils/Block";
import dataFillingForm from "../../utils/dataFillingForm";
import {addBlur, addFocus} from "../../utils/addFocusBlurEvents";
import { render } from "../../utils/render";


export default class FormRegistration extends Block {
    constructor() {
        super({
            firstNameInput: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            secondNameInput: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            loginInput: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            emailInput: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            phonInput: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            passwordInput: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            repitPasswordInput: [
                {
                    focus: function(e:HTMLFormElement) {
                        addFocus(e)
                    },
                    blur: function(e:HTMLFormElement) {
                        addBlur(e)
                    }
                }
            ],
            buttonRegistr: [
                {
                    class: "authorization_buttons size_h25_w180 bg_color_50AF8A",
                    label: "Зарегистрироваться",
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
