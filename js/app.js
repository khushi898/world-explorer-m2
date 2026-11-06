import { getAllCountries } from "./api.js";
import { renderCountries } from "./ui.js";

const app=document.getElementById("app");

async function init(){
    try{
        const countries=await getAllCountries();
        renderCountries(app, countries);
    }catch(error){
        console.log("Error:", error.message);
    }
    }
    init();
