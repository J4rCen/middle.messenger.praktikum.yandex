export default function dataFillingForm(formData: HTMLFormElement) {
    const data = new FormData(formData)
    let result = "";

    for(let a of formData.elements) {
        
        if(a.parentNode?.children[0].classList.contains("hide") && a.value !== "") {
            if(a.name !== "") {
                result += a.name + ": " + data.get(a.name) +";" + "\n"
            }
        } else if(!a.classList.contains("button")) {
            return undefined
        }

        
    }

    return result
}