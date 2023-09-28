import HTTPTransport from "../utils/HTTPTransport.ts";

export default abstract class baseAPI {
    protected http: HTTPTransport;

    protected constructor() {
        this.http = new HTTPTransport()
    }

    public abstract create?(data: unknown): Promise<unknown>
    public abstract read?(identification: number | string): Promise<unknown>;
    public abstract delete?(identification: number | string): Promise<unknown>;
    public abstract update?(identification: number | string, data: unknown): Promise<unknown>
}
