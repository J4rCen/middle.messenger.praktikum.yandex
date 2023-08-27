import template from "./data_changes.hbs";
import Block from "../../utils/Block";
import addFocusBlur from "../../utils/addFocusBlurEvents";
import dataFillingForm from "../../utils/dataFillingForm";
import { render } from "../../utils/render";

export default class FormChangeData extends Block {

    constructor() {
        super({
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

        addFocusBlur(this.element as HTMLFormElement);
    }

    render() {
        return this.compile(template, this.props)
    }
}
