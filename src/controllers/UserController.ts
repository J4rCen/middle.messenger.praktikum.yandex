import API, {userAPI, changeProfile, changePassword} from "../api/userAPI";
import Router from "../utils/Router";
import store from "../utils/Store";

export const urlResources = "https://ya-praktikum.tech/api/v2/resources/"

class UserControllerAPI {
    private readonly api: userAPI;

    constructor() {
        this.api = API
    }


    async changeProfile(data: changeProfile) {
        try {
            await this.api.changeProfile(data)
            await this.fetchUser
            alert("Данные успешно обновлены")
            Router.go("/profile")
        } catch(e) {
            alert("При обновлении данных произошла ошибка")
            console.error(e)
        }
    }

    async changeAvatar(data: FormData) {
        try {
            await this.api.changeAvatar(data);
            await this.fetchUser;
            alert("Аватарка успешно установлена")
        } catch(e) {
            alert("Произошла ошибка, проверьте тип файла")
            console.error(e)
        }
    }

    async changePassword(data: changePassword) {
        try {
            await this.api.changePassword(data)
            await this.fetchUser;
            alert("Пароль успешно заменен")
            Router.go("/profile")
        } catch(e) {
            alert("При обновлении пароля произошла ошибка")
            console.error(e)
        }
    }

    async fetchUser() {
        const user = await this.api.read()

        store.set("user", user)
    }

}

export default new UserControllerAPI();
