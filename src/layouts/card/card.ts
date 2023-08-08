import { HelperOptions } from "handlebars";

export default  function card(this: object, {fn}: HelperOptions): string {
    // console.log(fn(this))

    return (
        `
        <div class="card">
            
            ${fn(this)}

        </div>
        `
    )
}