import { getAllCountries } from "./api.js";

async function init(){
    try{
        const countries=await getAllCountries();
        console.log(countries);
    }catch(error){
        console.log("Error:", error.message);
    }
    }
    init();
