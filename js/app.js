import { getAllCountries } from "./api.js";
import { renderCountries, showError } from "./ui.js";

const app=document.getElementById("app");

async function init(){
    try{
        const countries=await getAllCountries();
        renderCountries(app, countries);
    }catch(error){
        showError(app,"Could not load countries. Try again",init);
        
    }
    }
    init();
