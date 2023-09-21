import WSTransport, { WSTransportEvent } from "../utils/WSTransport";
import store from "../utils/Store";

export interface Messages {
    chat_id: number;
    time: string;
    type: string;
    user_id: number;
    content: string;
}

class MesssagesController {
    private socket: Map<number, WSTransport> = new Map();

    async connect(id: number, token: string) {
        if(this.socket.has(id)) {
            return;
        }

        const userId = store.getState().user.id;
        const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
        this.socket.set(id, wsTransport);

        await wsTransport.connect();

        this.subscribe(wsTransport, id);
        this.fetchOldMessages(id);
    }

    sendMessages(id: number, messege: string) {
        const socket = this.socket.get(id);
        
        if(!socket) {
            throw new Error(`Chat: ${id} is not connected`);
        }

        socket.send({
            type: "message",
            content: messege
        })
    }

    fetchOldMessages(id: number) {
        const socket = this.socket.get(id);

        if(!socket) {
            throw new Error(`Chat: ${id} is not connected`);
        }

        socket.send({type: "get old", content: "0"})
    }

    closeAll() {
        Array.from(this.socket.values()).forEach(socket => socket.close());
    }

    private onMessage(id: number, message: Messages | Messages[]) {
        let messagesToAdd: Messages[] = [];

        if(Array.isArray(message)) {
            messagesToAdd = message.reverse()
        } else {
            messagesToAdd.push(message)
        }

        const currentMessages = (store.getState().messages || {})[id] || [];

        messagesToAdd = [...currentMessages, ...messagesToAdd];

        store.set(`messages.${id}`, messagesToAdd);
    }

    private onClose(id: number) {
        this.socket.delete(id)
    }

    private subscribe(transport: WSTransport, id: number) {
        transport.on(WSTransportEvent.Message, (message) => this.onMessage(id, message));
        transport.on(WSTransportEvent.Close, () => {this.onClose(id)})
    }
}

const controller = new MesssagesController();
export default controller;
