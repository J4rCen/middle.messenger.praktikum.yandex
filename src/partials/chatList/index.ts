import { ChatInfo } from "../../api/chatAPI";
import Block from "../../utils/Block";
import {Friend} from "../friend";
import template from "./chatList.hbs"
import ChatController from "../../controllers/ChatController";
import { withStore } from "../../utils/Store";

interface ChatListBaseProps {
    chats: ChatInfo[],
    isSelectet: boolean;
}

class ChatListBase extends Block<ChatListBaseProps> {

    constructor(props: ChatListBaseProps) {
        super({...props})
    }

    init() {
        this.children.chats = this.createChat(this.props)
    }

    protected componentDidUpdate(_oldProps: ChatListBaseProps, _newProps: ChatListBaseProps): boolean {
        this.children.chats = this.createChat(_newProps)
        return true;
    }


    private createChat(props: ChatListBaseProps) {
        return props.chats.map(data => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return new Friend({
                ...data,
                events: {
                    click: () => {
                        ChatController.selectChat(data.id)
                    }
                }
            })
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withChat = withStore((state) => ({chats: [...(state.chats || [])]}));
export const ChatList = withChat(ChatListBase)
