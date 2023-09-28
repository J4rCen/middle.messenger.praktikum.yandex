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

    it("Изменения данных юзера", () => {
        const data: changeProfile = {
            first_name: "Test1",
            second_name: "Test2",
            login: "Tetst3",
            email: "Test@test.test",
            password: "tetst222",
            phone: "89000000000",
        }

        api.changeProfile(data)

        expect(requests[0].method).to.eq("Put")
        expect(requests[0].requestBody).to.eq(JSON.stringify(data))
        expect(requests[0].url).to.eq(`${api_url}/user/profile`)
    })

    it("Изменения пароля юзера", () => {
        const data: changePassword = {
            oldPassword: "test222",
            newPassword: "test212"
        }

        api.changePassword(data)

        expect(requests[0].method).to.eq("Put")
        expect(requests[0].requestBody).to.eq(JSON.stringify(data))
        expect(requests[0].url).to.eq(`${api_url}/user/password`)
    })

    it("Получения информации о пользователе", () => {
        api.read()

        expect(requests[0].method).to.eq("Get")
        expect(requests[0].url).to.eq(`${api_url}/auth/user`)
    })
})
