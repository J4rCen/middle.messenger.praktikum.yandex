import { EventBus } from "./EventBus";

export enum WSTransportEvent {
    Connected = "connected",
    Error = "error",
    Message = "message",
    Close = "close"
}

export default class WSTransport extends EventBus {
    private soket: WebSocket | null = null;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private pingInterval: any = 0;

    constructor(private url: string) {
        super()
    }

    public send(data: unknown) {
        if(!this.soket) {
            throw new Error("Soket is not connected")
        }

        this.soket.send(JSON.stringify(data))
    }

    public connect(): Promise<void> {
        this.soket = new WebSocket(this.url);

        this.subscribe(this.soket);
        this.setupPing();

        return new Promise((resolve) => {
            this.on(WSTransportEvent.Connected, () => {
                resolve()
            })
        })
    }

    public close() {
        this.soket?.close()
    }

    private setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({ type: 'ping' });
          }, 5000)

        this.on(WSTransportEvent.Close, () => {
            clearInterval(this.pingInterval);
            this.pingInterval = 0
        })
    }

    private subscribe(soket: WebSocket) {
        soket.addEventListener("open", () => {
            this.emit(WSTransportEvent.Connected)
        });

        soket.addEventListener("close", () => {
            this.emit(WSTransportEvent.Close)
        });

        soket.addEventListener("error", (e) => {
            this.emit(WSTransportEvent.Error, e)
        });

        soket.addEventListener("message", (message) => {
            const data = JSON.parse(message.data);

            if(data.type && data.type === "pong") {
                return
            }

            this.emit(WSTransportEvent.Message, data)
        })
    }
}
