import { User } from "../../api/userAPI";
import Block from "../../utils/Block";
import ProfileInformation from "../profile__information";
import Button from "../button";
import Router from "../../utils/Router";
import { withStore } from "../../utils/Store";
import template from "./usre_information.hbs"
import Input from "../input";
import UserController, { urlResources } from "../../controllers/UserController";
import Image from "../image";
import UserAvatar from "../user_avatar";
import defaultUserAvatar from "../../images/profile/user.png" 


interface ProfileInformationUser extends User{}
const userInfo = ["avatar", "id", "login", "display_name", "first_name", "second_name", "email", "phone"] as Array<keyof ProfileInformationUser>
// eslint-disable-next-line @typescript-eslint/ban-types
const userDescriptions: User = {
    id: "id",
    login: "Логин",
    display_name: "Имя в чате",
    first_name: "Имя",
    second_name: "Фамилия",
    email: "Почта",
    phone: "Телефон",
} 

class UserInformationBase extends Block<ProfileInformationUser> {

    init() {

        this.children.inputChangeAvatar = new Input({
            name: "avatar", 
            type: "file", 
            class: "profile-input__change-data avatar_change",
        })
        this.children.buttonChangeAvatar = [
            new Button({
                class: "size_h25_w180 bg_color_50AF8A", 
                label: "Сохранить",
                events: {
                    click: () => this.onSubmit()
                }
            }),
            new Button({
                class: "size_h25_w180 bg_color_8c8c8c", 
                label: "Отмена",
                events: {
                    click: () => {
                        const updateMenuAvatar = document.querySelector(".menu__addFriend");
                        updateMenuAvatar?.classList.toggle("disabled")
                    }
                }
            })
        ]
        

        this.children.informationProfile = userInfo.map(name => {
            if(name === "avatar") {
                return new UserAvatar({image: new Image({class: "user_avatar_size", src: this.props[name] === undefined ? defaultUserAvatar : urlResources + this.props[name], alt: "Аватарка пользователя", events: {
                    click: () => {
                        const updateMenuAvatar = document.querySelector(".menu__addFriend");
                        updateMenuAvatar?.classList.toggle("disabled")
                    }
                }})})
            } else {
                return new ProfileInformation({descriptions: userDescriptions[name], information: this.props[name]})

            }
        })

        this.children.buttonProfileChange = [
            new Button({
                class: "size_h25_w180 bg_color_50AF8A", 
                label: "Изменить данные",
                events: {
                    click: () => {
                        Router.go('/settings/changeData')
                    }
                }
            }),
            new Button({
                class: "size_h25_w180 bg_color_50AF8A", 
                label: "Изменить пароль",
                events: {
                    click: () => {
                        Router.go('/settings/changePassword')
                    }
                }
            })
        ]
    }

    onSubmit() {
        const value = new FormData((this.children.inputChangeAvatar as Input).element?.parentNode as HTMLFormElement)
        UserController.changeAvatar(value)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
        (this.children.informationProfile as ProfileInformation[]).forEach((input, i) => {
            if(input instanceof UserAvatar && newProps[userInfo[i]] !== undefined) {
                (input.children.image as Image).setProps({src: urlResources + newProps[userInfo[i]]})
            } else {
                input.setProps({information: newProps[userInfo[i]]})
            }
        })

        return false
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withUser = withStore((state) => ({...state.user}))
export const UserInformation = withUser(UserInformationBase)
