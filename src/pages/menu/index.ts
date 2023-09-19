import Block from "../../utils/Block";
import template from "./menu.hbs"
import { ChatPage } from "../../partials/chat";
import InterfaceMenu from "../../partials/interface_menu";
import ProfilePage from "../profile"

export class MenuPage extends Block {
    init() {
        
        switch(window.location.pathname) {
            case "/messenger": 
                this.children.interfaceMenu = new InterfaceMenu({})
            break;
            case "/settings":
            case "/settings/changeData":
            case "/settings/changePassword":  
                this.children.interfaceMenu = new ProfilePage({})
            break;
        }

        this.children.ChatPage = new ChatPage({})
        
    }

    render() {
        return this.compile(template, {...this.props})
    }
}
