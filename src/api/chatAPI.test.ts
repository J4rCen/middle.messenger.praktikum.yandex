import { expect } from "chai";
import chatAPI from "./chatAPI.ts";
import sinon from "sinon";
import { api_url } from "../utils/HTTPTransport.ts";


describe("chatAPI", () => {
    const requests: sinon.SinonFakeXMLHttpRequest[] = [];
    const api = chatAPI;
    
    beforeEach(() => {
        const xhr: sinon.SinonFakeXMLHttpRequestStatic = sinon.useFakeXMLHttpRequest();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest()
        xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
            requests.push(request)
        }
    })

    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).XMLHttpRequest
        requests.length = 0
    })

    it("Создание чата", () => {
        const data = {
            title: "testTitl"
        }

        api.create(data.title)

        expect(requests[0].method).to.eq("Post")
        expect(requests[0].requestBody).to.eq(JSON.stringify(data))
        expect(requests[0].url).to.eq(`${api_url}/chats`)
    })

    it("Удаления чата", () => {
        api.delete(3)

        expect(requests[0].method).to.eq("Delete")
        expect(requests[0].url).to.eq(`${api_url}/chats`)
    })

    it("Получение информации о чатах", () => {
        api.read()

        expect(requests[0].method).to.eq("Get")
        expect(requests[0].url).to.eq(`${api_url}/chats`)
    })

    it("Получение информации о юзере в чате", () => {
        const id = 2;
        api.getUsers(id)
        expect(requests[0].method).to.eq("Get")
        expect(requests[0].url).to.eq(`${api_url}/chats/${id}/users`)
    })

    it("Добавления юзера в чат", () => {
        const data = {
            users: [
                2
            ],

            chatId: 2,
        }

        api.addUsers(data.chatId, data.users)

        expect(requests[0].method).to.eq("Put")
        expect(requests[0].requestBody).to.eq(JSON.stringify(data))
        expect(requests[0].url).to.eq(`${api_url}/chats/users`)
    })

    it("Удаление юзера из чата", () => {
        const id = 2;

        api.deleteUsers(id, [id])

        expect(requests[0].method).to.eq("Delete")
        expect(requests[0].url).to.eq(`${api_url}/chats/users`)
    })

    it("Получение токена чата", () => {
        const id = 2 
        api.getToken(id)

        expect(requests[0].method).to.eq("Post")
        expect(requests[0].url).to.eq(`${api_url}/chats/token/${id}`)
    })
})
