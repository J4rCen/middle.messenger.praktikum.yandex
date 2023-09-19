import Block from "../../utils/Block";
import template from "./profile.hbs"
import {FormChangeData} from "../../partials/data_changes"
import FormChangePassword from "../../partials/change_password"
import ImageBackArrow from "../../partials/image_back_arrow/image_back_arrow";
import { UserInformation } from "../../partials/user_information/user_information";


export default class ProfilePage extends Block {

    init() {
       
        this.children.backArrow = new ImageBackArrow();
        
        switch(window.location.pathname) {
            case "/settings":
                this.children.profile = new UserInformation({})
                break;
            case "/settings/changeData":
                this.children.profile = new FormChangeData({})
                break;
            case "/settings/changePassword":
                this.children.profile = new FormChangePassword({})
                break;
        }

    }

    render() {
        return this.compile(template, this.props)
    }
}


