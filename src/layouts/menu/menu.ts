import { HelperOptions } from "handlebars";

export default function menu(this: object, {fn}: HelperOptions): string {
    return (
        `
            <nav class="menu">
                ${fn(this)}
            </nav>
        `
    )
}
