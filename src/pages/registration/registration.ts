const formRegistratoin = document.querySelector("#form__registration") as HTMLFormElement;
import dataFillingForm from "../../utils/dataFillingForm";
import fillingCheck from "../../utils/addFocusBlurEvents";

formRegistratoin?.addEventListener("submit", (e: any) => {
    e.preventDefault()
    
    dataFillingForm(e.target) !== undefined 
    ? console.log(dataFillingForm(e.target)) 
    : alert("Проверте правельность ввода");
});

fillingCheck(formRegistratoin);