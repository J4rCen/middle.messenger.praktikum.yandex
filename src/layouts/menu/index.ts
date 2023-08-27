import Block from "../../utils/Block"
import template from "./menu.hbs"

export default class Menu extends Block {
    render() {
        return this.compile(template, this.props)
    }
}
