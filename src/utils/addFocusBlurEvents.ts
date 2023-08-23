export default function fillingCheck(formInput: HTMLFormElement) {
    for(let a in formInput) {
        formInput[a].addEventListener("blur", (e: any) => {
        const err = () => e.target.parentNode.children[0].classList.remove("hide");
        
        switch(e.target.name) {
            case "login":

                (e.target.value.match(/^[a-z]([a-z0-9_-]){3,20}$/gi)) 
                ? alert("login corect") 
                : err();

            break;

            case "password": 

                (e.target.value.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/g))
                ? alert("password corect") 
                : err();

            break;

            case "email":

                (e.target.value.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) 
                ? alert("email corect") 
                : err();

            break;

            case "phone": 

                (e.target.value.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,15}$/gi)) 
                ? alert("phone corect") 
                : err();

            break;

            case "first_name":
            case "second_name":

                (e.target.value.match(/^[A-ZА-Я-][a-zа-я-]+/g)) 
                ? alert("name corect") 
                : err();

            break;

            case "repit_password":

                e.target.value === new FormData(formInput).get("password")
                ? alert("repit_password corect")
                : err();
                
            break;
        }
    })

        formInput[a].addEventListener("focus", (e: any) => {
            e.target.parentNode.children[0].classList.add("hide")
        })
    }
}