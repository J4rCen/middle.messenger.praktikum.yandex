import template from "./error_404"
import Block from "../../utils/Block"
import Handlebars from "handlebars"

export default class Error404Page extends Block {
    static template = Handlebars.compile(template)
    render() {
        return this.compile(Error404Page.template, this.props)
    }
} 
