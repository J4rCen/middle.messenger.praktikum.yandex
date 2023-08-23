const formAuthorization = document.querySelector("#form_authorization") as HTMLFormElement;
import dataFillingForm from "../../utils/dataFillingForm";
import fillingCheck from "../../utils/addFocusBlurEvents";


formAuthorization?.addEventListener("submit", (e: any) => {
    e.preventDefault()
    
    dataFillingForm(e.target) !== undefined 
    ? console.log(dataFillingForm(e.target)) 
    : alert("Проверте правельность ввода");
    
});

fillingCheck(formAuthorization);
