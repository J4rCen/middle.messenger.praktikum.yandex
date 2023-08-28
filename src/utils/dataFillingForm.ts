export default function dataFillingForm(formData: HTMLFormElement) {
    const data = new FormData(formData)
    let result = "";

    for(const a of formData.elements) {
        if(a.parentNode?.children[0].classList.contains("hide") && (<HTMLInputElement>a).value !== "") {
            if((<HTMLInputElement>a).name !== "") {
                result += (<HTMLInputElement>a).name + ": " + data.get((<HTMLInputElement>a).name) +";" + "\n"
            }
        } else if(!a.classList.contains("button")) {
            return undefined
        }

        
    }

    return result
}
