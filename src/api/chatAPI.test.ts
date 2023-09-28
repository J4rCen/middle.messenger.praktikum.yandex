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

    describe("Создание чата", () => {
        const data = {
            title: "testTitl"
        }

        it("Отправка данных методом post", () => {
            api.create(data.title)
            expect(requests[0].method).to.eq("Post")
        })

        it("Отправка данных на сервер", () => {
            api.create(data.title)
            expect(requests[0].url).to.eq(`${api_url}/chats`)
        })
    })

    describe("Удаления чата", () => {
        it("Отправка данных методом delete", () => {
            api.delete(3)
            expect(requests[0].method).to.eq("Delete")
        })

        it("Отправка данных на сервер", () => {
            api.delete(3)
            expect(requests[0].url).to.eq(`${api_url}/chats`)
        })
    })

    describe("Получение информации о чатах", () => {
        it("Получение данных методом Get", () => {
            api.read()
            expect(requests[0].method).to.eq("Get")
        })

        it("Запрос данных с сервера", () => {
            api.read()
            expect(requests[0].url).to.eq(`${api_url}/chats`)
        })
    })

    describe("Получение информации о юзере в чате", () => {
        const id = 2;
        
        it("Получение данных методом Get", () => {
            api.getUsers(id)
            expect(requests[0].method).to.eq("Get")
        })

        it("Запрос данных с сервера", () => {
            api.getUsers(id)
            expect(requests[0].url).to.eq(`${api_url}/chats/${id}/users`)
        })
    })

    describe("Добавления юзера в чат", () => {
        const data = {
            users: [
                2
            ],

            chatId: 2,
        }

        it("Отправка данных методом Put", () => {
            api.addUsers(data.chatId, data.users)
            expect(requests[0].method).to.eq("Put")
        })

        it("Отправка данных на сервер", () => {
            api.addUsers(data.chatId, data.users)
            expect(requests[0].url).to.eq(`${api_url}/chats/users`)
        })

    })

    describe("Удаление юзера из чата", () => {
        const id = 2;

        it("Отправка данных методом delete", () => {
            api.deleteUsers(id, [id])
            expect(requests[0].method).to.eq("Delete")
        })

        it("Отправка данных на сервер", () => {
            api.deleteUsers(id, [id])
            expect(requests[0].url).to.eq(`${api_url}/chats/users`)
        })
        
    })

    describe("Получение токена чата", () => {
        const id = 2 
        

        it("Отправка данных методом post", () => {
            api.getToken(id)
            expect(requests[0].method).to.eq("Post")
        })

        it("Отправка данных на сервер", () => {
            api.getToken(id)
            expect(requests[0].url).to.eq(`${api_url}/chats/token/${id}`)
        })
    })
})
