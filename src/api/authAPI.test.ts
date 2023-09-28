import authAPI from "./authAPI.ts";
import sinon from "sinon";
import {expect} from "chai";
import { api_url } from "../utils/HTTPTransport.ts";

describe("authAPI", () => {
    const requests: sinon.SinonFakeXMLHttpRequest[] = [];
    const api = authAPI;


    beforeEach(() => {
        const xhr: sinon.SinonFakeXMLHttpRequestStatic = sinon.useFakeXMLHttpRequest();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
            requests.push(request)
        }
    })

    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).XMLHttpRequest
        requests.length = 0;
    })

    describe("Авторизация", () => {
        it("Отправка данных методом post", () => {
            api.signin()
            expect(requests[0].method).to.eq("Post")
        })

        it("Отправка данных на сервер", () => {
            api.signin()
            expect(requests[0].url).to.eq(`${api_url}/auth/signin`)
        })
    })

    describe("Регистрация", () => {
        it("Отправка данных методом post", () => {
            api.signup()
            expect(requests[0].method).to.eq("Post")
        })

        it("Отправка данных на сервер", () => {
            api.signup()
            expect(requests[0].url).to.eq(`${api_url}/auth/signup`)
        })
    })

    describe("Выход из аккаунта", () => {
        it("Отправка данных методом post", () => {
            api.logout()
            expect(requests[0].method).to.eq("Post")
        })

        it("Отправка данных на сервер", () => {
            api.logout()
            expect(requests[0].url).to.eq(`${api_url}/auth/logout`)
        })
    })
    
    describe("Получения информации о пользователе", () => {
        it("Отправка данных методом get", () => {
            api.read()
            expect(requests[0].method).to.eq("Get")
        })

        it("Отправка данных на сервер", () => {
            api.read()
            expect(requests[0].url).to.eq(`${api_url}/auth/user`)
        })
    })
})
