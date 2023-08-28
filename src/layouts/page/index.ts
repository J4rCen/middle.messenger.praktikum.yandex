import Block from "../../utils/Block";
import template from "./page.hbs"

export default class page extends Block {
    render() {
        return this.compile(template, this.props)
    }
}
