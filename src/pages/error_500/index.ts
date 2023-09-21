import template from "./error_500.hbs"
import Block from "../../utils/Block"
import ErrorMessage from "../../partials/error"

export default class Error500Page extends Block {
    

    init() {
        this.children.error500 = new ErrorMessage({error_number: "500", error_descriptions: "Серверу не здоровиться, попробуйте позже"})
    }

    render() {
        return this.compile(template, this.props)
    }
} 
