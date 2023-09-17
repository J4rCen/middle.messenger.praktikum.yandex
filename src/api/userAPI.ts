import baseAPI from "./baseAPI";

export interface User {
    id: number | string,
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password?: string,
    phone: string,
    avatar?: string,
    display_name: string,
}

export interface changeProfile {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
}

export interface changePassword {
    oldPassword: string,
    newPassword: string
}

export class userAPI extends baseAPI {

    constructor() {
        super()
    }

    changeProfile(data: changeProfile) {
        return this.http.put("/user/profile", data)
    }

    changeAvatar(data: FormData) {
        return this.http.put("/user/profile/avatar", data)
    }

    changePassword(data: changePassword) {
        return this.http.put("/user/password", data)
    }

    read(): Promise<unknown> {
        return this.http.get("/auth/user")
    }

    create = undefined
    delete = undefined
    update = undefined
}

export default new userAPI();
