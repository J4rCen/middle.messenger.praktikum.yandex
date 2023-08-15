import { defineConfig, Plugin } from "vite";
import {resolve} from "path";
import handlebars from "vite-plugin-handlebars";
import card from "./src/layouts/card/card";
import menu from "./src/layouts/menu/menu"


export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            helpers: {
                card,
                menu
            },
        }) as unknown as Plugin,
    ],

    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                login: resolve(__dirname, "src/pages/login/login.html"),
                registration: resolve(__dirname, "src/pages/registration/registration.html"),
                menu: resolve(__dirname, "src/pages/menu/menu.html"),
                profile: resolve(__dirname, "src/pages/profile/profile.html"),
                data_changes: resolve(__dirname, "src/pages/data_changes/data_changes.html"),
                change_password: resolve(__dirname, "src/pages/change_password/change_password.html"),
                error_404: resolve(__dirname, "src/pages/error_404/error_404.html"),
                error_500: resolve(__dirname, "src/pages/error_500/error_500.html")
            }
        }
    }
})
