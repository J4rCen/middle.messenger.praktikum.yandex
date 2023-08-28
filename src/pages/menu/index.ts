import Block from "../../utils/Block";
import { render } from "../../utils/render";
import template from "./menu.ts"
import Handlebars from "handlebars";
import img from "../../images/menu/menu.png"

export class MenuPage extends Block {
    static template = Handlebars.compile(template)
    constructor() {
        super({
            btnImgMenu: [
                {
                    class: "img__context-menu",
                    src: img,
                    onClick: () => {
                        const menu = document.querySelector(".menu__contex-menu");
                        menu?.classList.toggle("disabled")
                        
                    }
                }
            ],

            menuList: [
                {
                    class: "context-menu__list__items",
                    label: "Профиль",
                    onClick: () => {
                        render("profile")
                    }
                },
                {
                    class: "context-menu__list__items",
                    label: "Выйти",
                    onClick: () => {
                        render("login")
                    }
                }
            ]
        })
    }

    render() {
        return this.compile(MenuPage.template, this.props)
    }
}
