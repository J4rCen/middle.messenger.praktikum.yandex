import userAPI, { changePassword, changeProfile } from "./userAPI.ts";
import sinon from "sinon";
import { expect } from "chai";
import { api_url } from "../utils/HTTPTransport.ts";

describe("userAPI", () => {
    const api = userAPI;
    const requests: sinon.SinonFakeXMLHttpRequest[] = [];


    beforeEach(() => {
        const xhr: sinon.SinonFakeXMLHttpRequestStatic = sinon.useFakeXMLHttpRequest();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        xhr.onCreate  = (request: sinon.SinonFakeXMLHttpRequest) => {
            requests.push(request)
        }
    })

    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).XMLHttpRequest
        requests.length = 0;
    })

    describe("Изменения данных юзера", () => {
        const data: changeProfile = {
            first_name: "Test1",
            second_name: "Test2",
            login: "Tetst3",
            email: "Test@test.test",
            password: "tetst222",
            phone: "89000000000",
        }

        it("Отправка данных методом put", () => {
            api.changeProfile(data)
            expect(requests[0].method).to.eq("Put")
        })

        it("Отправка данных на сервер", () => {
            api.changeProfile(data)
            expect(requests[0].url).to.eq(`${api_url}/user/profile`)
        })
        
    })

    describe("Изменения пароля юзера", () => {
        const data: changePassword = {
            oldPassword: "test222",
            newPassword: "test212"
        }


        it("Отправка данных методом put", () => {
            api.changePassword(data)
            expect(requests[0].method).to.eq("Put")
        })

        it("Отправка данных на сервер", () => {
            api.changePassword(data)
            expect(requests[0].url).to.eq(`${api_url}/user/password`)
        })
        
    })

    describe("Получения информации о пользователе", () => {
        it("Получение данных методом Get", () => {
            api.read()
            expect(requests[0].method).to.eq("Get")
        })

        it("Запрос данных с сервера", () => {
            api.read()
            expect(requests[0].url).to.eq(`${api_url}/auth/user`)
        })
    })
})
