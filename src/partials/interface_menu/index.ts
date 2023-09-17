import Block from "../../utils/Block";
import template from "./interface_menu.hbs";
import img from "../../images/menu/menu.png"
import ListItem from "../../partials/list_item";
import Image from "../../partials/image";
import Input from "../../partials/input";
import Router from "../../utils/Router";
import AuthController from "../../controllers/AuthController";
import ChatController from "../../controllers/ChatController";
import Button from "../../partials/button";
import { ChatList } from "../chatList";

export default class InterfaceMenu extends Block {

    
    init() {
        this.children.imageMenu = new Image({
            class: "img__context-menu",
            src: img,
            alt: "Menu",
            events: {
                click: () => {
                    const menu = document.querySelector(".menu__contex-menu");
                    menu?.classList.toggle("disabled")
                }
            }
        });

        this.children.createChat = [
            new Input({
                name: "createChat",
                type: "text",
                class: "text-input search-friend-id", 
                placeholder: "Введите названия чата"
            }),
            new Button({
                label: "Создать",
                class: "size_h25_w180 bg_color_50AF8A",
                events: {
                    click: () => this.createChat((this.children.createChat as Input[])[0].getValue())
                }
            }),
            new Button({
                label: "Отмена",
                class: "size_h25_w180 bg_color_8c8c8c",
                events: {
                    click: () => {
                        const menu = document.querySelector(".menu__addFriend");
                        menu?.classList.toggle("disabled")
                    }
                }
            })
        ]

        this.children.inputSearch = new Input({
            name: "search",
            class: "text-input search-menu", 
            placeholder: "Поиск"
        });

        this.children.liMenu = [
            new ListItem({
                class: "context-menu__list__items",
                label: "Профиль",
                events: {
                    click: () => {
                        Router.go("/profile")
                    }
                }
            }),
            new ListItem({
                class: "context-menu__list__items",
                label: "Добавить чат",
                events: {
                    click: () => {
                        const menu = document.querySelector(".menu__addFriend");
                        menu?.classList.toggle("disabled")
                    }
                }
            }),
            new ListItem({
                class: "context-menu__list__items",
                label: "Выйти",
                events: {
                    click: () => {
                        AuthController.logout()
                    }
                }
            })
        ];

        this.children.friendList = new ChatList({})
        ChatController.fetchChats()

    }

    private createChat(inputValue: string) {
        ChatController.create(inputValue)
    }

    render() {
        return this.compile(template, this.props)
    }
}
