import { ChatInfo } from "../../api/chatAPI";
import { urlResources } from "../../controllers/UserController";
import Block from "../../utils/Block";
import { withStore } from "../../utils/Store";
import template from "./friend.hbs";
import Image from "../image";
import defaultChatImg from "../../images/menu/defaultChat.png"

interface FriendProps {
    avatar: string;
    id: number;
    title: string;
    unraed_count: number;
    selectedChat: ChatInfo;
    events: {
        click: () => void;
    }
}
class FriendBase extends Block<FriendProps> {
    constructor(props: FriendProps) {
        super(props)
    }

    init() {
        this.children.avatar = new Image({
            src: `${this.props.avatar !== "" ? urlResources + this.props.avatar : defaultChatImg}`,
            alt: "Аватарка чата",
            class: "user_avatar chat_avatar_size"
        })

    }

    render(): DocumentFragment {
        return this.compile(template, {...this.props, isSelected: this.props.id === this.props.selectedChat?.id})
    }
}

export const withSelectedChat = withStore(state => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}))
export const Friend = withSelectedChat(FriendBase);
