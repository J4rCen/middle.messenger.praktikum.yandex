import template from "./form_registration.hbs";
import Block from "../../utils/Block";
import dataFillingForm from "../../utils/dataFillingForm";
import fillingCheck from "../../utils/addFocusBlurEvents";
import { render } from "../../utils/render";


export default class FormRegistration extends Block {
    constructor() {
        super({
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

        fillingCheck(this.element as HTMLFormElement)
        
    }

    render() {
        return this.compile(template, this.props);
    }
}
