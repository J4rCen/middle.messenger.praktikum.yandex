import Block from "../../utils/Block";
import template from "./profile"
import Handlebars from "handlebars";
import { render } from "../../utils/render";
import img from "../../images/profile/backward.png"

export default class ProfilePage extends Block {
    static template = Handlebars.compile(template)
    
    constructor() {
        super({
            imgBackward: [
                {
                    class: "img__context-profile",
                    src: img,
                    alt: "Вернуться назад",
                    onClick: () => {
                        render("menu")
                    }
                }
            ],
            profileInformation: [
                {
                    class: "profile__information__email", 
                    descriptions: "Почта:", 
                    information: "test@test.ru"
                },
                {
                    class: "profile__information__login", 
                    descriptions: "Логин:", 
                    information: "Danil"
                },
                {
                    class: "profile__information__firtsName", 
                    descriptions: "Имя:", 
                    information: "Данил"
                },
                {
                    class: "profile__information__lastName", 
                    descriptions: "Фамилия:", 
                    information: "Давлетов"
                },
                {
                    class: "profile__information__chatName", 
                    descriptions: "Имя в чате:", 
                    information: "Danil04"
                },
                {
                    class: "profile__information__fhon", 
                    descriptions: "Номер телефона:", 
                    information: "+7 000 000 00 00"
                }
            ],
            buttonProfileChange: [
                {
                    class: "size_h25_w180 bg_color_50AF8A", 
                    label: "Изменить данные",
                    onClick: () => {
                        render("changeData")
                    }
                },
                {
                    class: "size_h25_w180 bg_color_50AF8A", 
                    label: "Изменить пароль",
                    onClick: () => {
                        render("changePassword")
                    }
                }
            ]
        })
    }

    render() {
        return this.compile(ProfilePage.template, this.props)
    }
}
