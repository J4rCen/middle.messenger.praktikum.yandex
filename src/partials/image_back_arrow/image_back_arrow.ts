import Block from "../../utils/Block";
import Image from "../image";
import template from "./image_back_arrow.hbs"
import img from "../../images/profile/backward.png"
import Router from "../../utils/Router";

export default class ImageBackArrow extends Block {

    constructor() {
        super({})
    }

    init() {
        this.children.imageBack = new Image({
            class: "img__context-profile",
            src: img,
            alt: "Вернуться назад",
            events: {
                click: () => {
                    Router.go("/menu")
                }
            }
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
