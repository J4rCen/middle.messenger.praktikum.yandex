import template from './data_changes';
import Block from '../../utils/Block';
import Handlebars from 'handlebars';
import img from "../../images/profile/backward.png";
import { render } from '../../utils/render';

export default class ChangeDataPage extends Block {
    static template = Handlebars.compile(template)

    constructor() {
        super({
            imgBackward: [
                {
                    class: "img__context-profile",
                    src: img,
                    alt: "Вернуться назад",
                    onClick: () => {
                        render("profile")
                    }
                }
            ],
        })
    }

    render() {
        return this.compile(ChangeDataPage.template, this.props)
    }
}
