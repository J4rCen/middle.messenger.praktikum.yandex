// Utils
import Router from "./src/utils/Router";

// Pages
import {LoginPage} from "./src/pages/login";
import {RegistrationPage} from "./src/pages/registration";
import {MenuPage} from "./src/pages/menu";
import AuthController from "./src/controllers/AuthController";
import Error404Page from "./src/pages/error_404"
import Error500Page from "./src/pages/error_500"

enum Routes {
    Index = "/",
    Registration = "/registration",
    Menu = "/menu",
    ProfilePage = "/profile",
    ChangeData = "/profile/changeData",
    ChangePassword = "/profile/changePassword",
    Error404 = "/Error404",
    Error500 = "/Error500",
}

window.addEventListener("DOMContentLoaded", async () => {
    Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Registration, RegistrationPage)
    .use(Routes.Menu, MenuPage)
    .use(Routes.ProfilePage, MenuPage)
    .use(Routes.ChangeData, MenuPage)
    .use(Routes.ChangePassword, MenuPage)
    .use(Routes.Error404, Error404Page)
    .use(Routes.Error500, Error500Page)

    let isProtected = true;
    
    Router.start()

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.Registration:
            isProtected = false
        break
    }

    try {
        await AuthController.fetchUser()

        Router.start()

        if(!isProtected) {
            Router.go(Routes.Menu)
        }
    } catch(e) {
        Router.start()
        if(isProtected) {
            Router.go(Routes.Index)
        }
    }
})
