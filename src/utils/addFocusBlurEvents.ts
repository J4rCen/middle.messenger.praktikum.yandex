export default function addFocusBlur(formInput: HTMLFormElement) {
    for(const a in formInput) {
        if(formInput[a] === "") {
            return
        }
        
        formInput[a].addEventListener("blur", (e: HTMLFormElement) => {
        const err = () => e.srcElement.parentNode.children[0].classList.remove("hide");
        
        switch(e.srcElement.name) {
            case "login":

                (e.srcElement.value.match(/^[a-z]([a-z0-9_-]){3,20}$/gi)) 
                ? ""
                : err();

            break;

            case "old_password":
            case "password": 

                (e.srcElement.value.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/g))
                ? ""
                : err();

            break;

            case "email":

                (e.srcElement.value.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) 
                ? ""
                : err();

            break;

            case "phone": 

                // eslint-disable-next-line no-useless-escape
                (e.srcElement.value.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,15}$/gi)) 
                ? ""
                : err();

            break;

            case "first_name":
            case "second_name":

                (e.srcElement.value.match(/^[A-ZА-Я-][a-zа-я-]+/g)) 
                ? ""
                : err();

            break;

            case "repit_password":

                e.srcElement.value === new FormData(formInput).get("password") && e.srcElement.value !== ""
                ? ""
                : err();
                
            break;
        }
    })

    if(formInput[a].name !== "") {
        formInput[a].addEventListener("focus", (e: HTMLFormElement) => {
            e.srcElement.parentNode.children[0].classList.add("hide")
        })
    }
        
    }
}
