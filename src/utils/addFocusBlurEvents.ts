function addFocus(element: HTMLFormElement) {
    element.srcElement.parentNode.children[0].classList.add("hide")
}

function addBlur(e: HTMLFormElement) {
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
                console.log(e)
                e.srcElement.value === new FormData(e.srcElement.form).get("password") && e.srcElement.value !== ""
                ? ""
                : err();
                
            break;
        }
}

export {addBlur, addFocus};
