import API, {authAPI, signInData, signUpData} from "../api/authAPI"
import router from "../utils/Router";
import store from "../utils/Store";

class AuthController {
    private readonly api: authAPI

    constructor() {
        this.api = API;
    }

    async signin(data: signInData) {

        try {
            await this.api.signin(data)
            await this.fetchUser()
            router.go("/messenger")
        } catch(e) {
            // throw new Error(`${e}`)
            console.error(e)
        }
       

    }

    async signup(data: signUpData) {
        try{
            await this.api.signup(data)
            await this.fetchUser()
            router.go("/messenger")
        } catch(e) {
            throw new Error(`${e}`)
        }
    }

    async fetchUser() {
        const user = await this.api.read()
        store.set("user", user)
    }

    async logout() {
        try {
            await this.api.logout()
            router.go("/")
        } catch(e) {
            throw new Error(`${e}`)
        }
    }
}

export default new AuthController()
