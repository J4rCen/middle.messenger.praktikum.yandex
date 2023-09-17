import API, {ChatsAPI} from "../api/chatAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";


class ChatController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = API
    }

    async create(title: string) {
        try {
            await this.api.create(title)
            this.fetchChats();
        } catch(e) {
            alert("Произошла ошибка при создании чата")
            console.error(e)
        }
        
    }

    async fetchChats() {

        try {
            const chats = await this.api.read();
            chats.map(async (chat: { id: number; }) => {
                const token = await this.getToken(chat.id);
                await MessagesController.connect(chat.id, token)
            });

            store.set("chats", chats)
        } catch(e) {
            console.error(e)
        }
        
    }

    updateAvatarChat(file: FormData) {
        try {
            this.api.updateAvatarChat(file)
        } catch(e) {
            alert("При обновлении аватарки произошла ошибка")
            console.error(e)
        }
    }

    addUserToChat(id: number, userId: number) {
        this.api.addUsers(id, [userId])
    }

    deleteUserToChat(id: number, userId: number) {
        this.api.deleteUsers(id, [userId])
    }

    async delete(id: number) {
        try {
            await this.api.delete(id)
            this.fetchChats();
            alert("Чат удален")
        } catch(e) {
            alert("При удаление чата произола ошибка")
            console.error(e)
        }
        
    }

    getToken(id: number) {
        return this.api.getToken(id)
    }

    selectChat(id: number) {
        store.set("selectedChat", id)
    }

}

const controller = new ChatController();
export default controller;

