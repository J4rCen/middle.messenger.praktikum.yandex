import baseAPI from "./baseAPI.ts";

export interface signInData {
    login: string;
    password: string
}

export interface signUpData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export class authAPI extends baseAPI {
    constructor() {
        super()
    }

    signin(data?: signInData) {
        return this.http.post("/auth/signin", data)
    }

    signup(data?: signUpData) {
        return this.http.post("/auth/signup", data)
    }

    read(): Promise<unknown> {
        return this.http.get("/auth/user")
    }

    logout() {
        return this.http.post("/auth/logout")
    }

    create = undefined;
    delete = undefined;
    update = undefined;
}

export default new authAPI()
