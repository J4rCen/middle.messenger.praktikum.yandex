import template from "./error_404.hbs"
import Block from "../../utils/Block"
import ErrorMessage from "../../partials/error"

export default class Error404Page extends Block {
    

    init() {
        this.children.error404 = new ErrorMessage({error_number: "404", error_descriptions: "Походу вы не туда попали"})
    }

    render() {
        return this.compile(template, this.props)
    }
} 
