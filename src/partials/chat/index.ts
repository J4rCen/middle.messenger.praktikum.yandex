import template from "./chat.hbs";
import Block from "../../utils/Block";
import Message from "../message"
import {Messages} from "../../controllers/MessagesController";
import { withStore } from "../../utils/Store";
import Input from "../input";
import Button from "../button";
import MesssagesController from "../../controllers/MessagesController";
import Image from "../image"
import imgMenuChat from "../../images/chat/menu.png"
import ChatController from "../../controllers/ChatController";


interface MessagesProps {
    selectedChat: number;
    messages: Messages[];
    userId: number;
}
class ChatPageBase extends Block<MessagesProps> {
    constructor(props: MessagesProps) {
        super(props)
    }

    init() {

        this.children.addAvatarChat = [
            new Input({
                name: "avatar", 
                type: "file", 
                class: "profile-input__change-data addUserChat",
            }),
            new Button({
                label: "Изменить аватарку чата",
                class: "size_h25_w180 bg_color_50AF8A",
                events: {
                    click: () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        const sendFile = new FormData((this.children.addAvatarChat[0] as Input).element?.parentNode as HTMLFormElement)
                        sendFile.append("chatId", (this.props.selectedChat as unknown as string))
                        
                        ChatController.updateAvatarChat(sendFile)
                    }
                }
            }),
        ]

        this.children.addUserChat = [
            new Input({
                placeholder: "Введите id пользователя",
                name: "addUserChat", 
                type: "number", 
                class: "profile-input__change-data addUserChat",
            }),
            new Button({
                label: "Добавить пользователя",
                class: "size_h25_w180 bg_color_50AF8A",
                events: {
                    click: () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        const addUserID = (this.children.addUserChat[0] as Input).getValue()
                        if(addUserID !== "") {
                            ChatController.addUserToChat(this.props.selectedChat, (addUserID as unknown as number))
                        } else {
                            alert("Поле id не должно быть пустым")
                        }
                    }
                }
            }),
        ]

        this.children.deleteUserChat = [
            new Input({
                placeholder: "Введите id пользователя",
                name: "deleteUserChat", 
                type: "number", 
                class: "profile-input__change-data",
            }),
            new Button({
                label: "Удалить пользователя",
                class: "size_h25_w180 bg_color_red",
                events: {
                    click: () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        const addUserID = (this.children.addUserChat[0] as Input).getValue()
                        if(addUserID !== "") {
                            ChatController.deleteUserToChat(this.props.selectedChat, (addUserID as unknown as number))
                        } else {
                            alert("Поле id не должно быть пустым")
                        }
                    }
                }
            }),
        ]

        this.children.deleteChat = new Button({
            label: "Удалить чат",
            class: "bg_color_red size_h25_w180 ",
            events: {
                click: () => {
                    const isDelete = confirm("Вы уверены что хотите удалить чат ?")

                    if(isDelete) {
                        ChatController.delete(this.props.selectedChat)
                    } else {
                        alert('Удаления чата отменено')
                    }
                }
            }
        })

        this.children.chatMenuImg = new Image({
            src: imgMenuChat,
            class: "img_contex_menu_chata",
            alt: "Настройки чата",
            events: {
                click: () => {
                    document.querySelector(".contex_menu_chata")?.classList.toggle("disabled")
                }
            }
        })

        this.children.messages = this.createMessages(this.props);

        this.children.inputMessage = new Input({
            class: "main__chat__input_chat_message", 
            name:"message", 
            type: "text", 
            placeholder:"Сообщения",
            events: {
                keydown: (e) => { e.key === "Enter" ? this.onSubmit() : ""}
            }
        })

        this.children.buttonSend = new Button({
            class: "main__chat__button_send_message",
            type: "button",
            events: {
                click: () => this.onSubmit()
            }
        })
    }

    protected componentDidUpdate(_oldProps: MessagesProps, _newProps: MessagesProps): boolean {

        this.children.messages = this.createMessages(_newProps);
        return true
    }

    private onSubmit() {
        const input = (this.children.inputMessage as Input)

        if(input.getValue() !== "") {
            const message = input.getValue()
            MesssagesController.sendMessages(this.props.selectedChat!, message)
            input.setValue("")
        } else {
            alert("Сообщения не должно быть пустым")
        }
    }

    private createMessages(props: MessagesProps) {
        return props.messages.map(data => {
            return new Message({
                ...data,
                isMine: props.userId === data.user_id
            })
        })
    }

    render() {
        return this.compile(template, {...this.props})
    }
}


const withSelectedChatMessages = withStore(state => {
    const selectedChatId = state.selectedChat;

    if(!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
        }
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user.id
    }
})

export const ChatPage = withSelectedChatMessages(ChatPageBase)
