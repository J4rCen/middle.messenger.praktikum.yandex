import authAPI, { signInData, signUpData } from "./authAPI.ts";
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
        const data: signInData = {
            login: "DD11DD",
            password: "DDDD1111"
        }

        it("Отправка данных методом post", () => {
            api.signin(data)
            expect(requests[0].method).to.eq("Post")
        })

        it("Отправка данных на сервер", () => {
            api.signin(data)
            expect(requests[0].url).to.eq(`${api_url}/auth/signin`)
        })

        it("Получение данных с сервера", () => {
            api.signin(data)
            expect(requests[0].requestBody).to.eq(JSON.stringify(data))
        })
    })

    it("Регистрация", () => {
        const data: signUpData = {
            first_name: "Dimater",
            second_name: "Dimater",
            login: "DDFFGG11",
            email: "test@test.test",
            password: "DDDD8080",
            phone: "89000000000"
        }

        api.signup(data)

        expect(requests[0].method).to.eq("Post")
        expect(requests[0].requestBody).to.eq(JSON.stringify(data))
        expect(requests[0].url).to.eq(`${api_url}/auth/signup`)
    })

    it("Выход из аккаунта", () => {
        api.logout()

        expect(requests[0].method).to.eq("Post")
        expect(requests[0].url).to.eq(`${api_url}/auth/logout`)
    })
    
    it("Получения информации о пользователе", () => {
        api.read()

        expect(requests[0].method).to.eq("Get")
        expect(requests[0].url).to.eq(`${api_url}/auth/user`)
    })
})
