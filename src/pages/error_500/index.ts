import template from "./error_500"
import Block from "../../utils/Block"
import Handlebars from "handlebars"

export default class Error500Page extends Block {
    static template = Handlebars.compile(template)
    render() {
        return this.compile(Error500Page.template, this.props)
    }
} 
