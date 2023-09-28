import { expect } from "chai";
import sinon from "sinon";
import HTTPTransport, { api_url } from "./HTTPTransport.ts";

describe("HTTPTransport", () => {
    const requests: sinon.SinonFakeXMLHttpRequest[] = [];
    const api: HTTPTransport = new HTTPTransport();
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
        requests.length = 0;
    })

    describe("Get метод", () => {
        it("Отправка методом get", () => {
            api.get("/auth/user")
            expect(requests[0].method).to.eq('Get')
        })

        it("Запрос уходит на сервер", () => {
            api.get("/")
            expect(requests[0].url).to.eq(`${api_url}/`)
        })
    })

    describe("Post метод", () => {
        it("Отправка методом post", () => {
            const data = {}

            api.post("/", data)
            expect(requests[0].method).to.eq('Post')
        })

        it("Запрос уходит на сервер", () => {
            api.post("/")
            expect(requests[0].url).to.eq(`${api_url}/`)
        })
    })

    describe("Put метод", () => {
        it("Отправка методом put", () => {

            const data = {}

            api.put("/", data)
            expect(requests[0].method).to.eq('Put')
        })
    })

    describe("Delete метод", () => {
        it("Удаления методом delete", () => {
            const data = {}

            api.delete("/", data)
            expect(requests[0].method).to.eq('Delete')
        })
    })
})
