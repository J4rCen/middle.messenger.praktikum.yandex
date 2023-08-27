import template from "./form_authorization.hbs";
import Block from "../../utils/Block";
import dataFillingForm from "../../utils/dataFillingForm";
import addFocusBlur from "../../utils/addFocusBlurEvents";
import { render } from "../../utils/render";


export default class FormAuthorization extends Block {
    constructor() {
        super({
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

        addFocusBlur(this.element as HTMLFormElement)
        
    }

    render() {
        return this.compile(template, this.props);
    }
}
