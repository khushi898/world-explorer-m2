import { getAllCountries } from "./api.js";
import { renderCountries,showLoading, showError,fillRegionOptions,renderDetail } from "./ui.js";

const app=document.getElementById("app");
const searchInput=document.getElementById("search");
const regionSelect=document.getElementById("region");
const sortSelect=document.getElementById("sort");
const refreshButton=document.getElementById("refresh");

let allCountries=[];

function applyFilters(){
    const searchText=searchInput.value.trim().toLowerCase();
    const region =regionSelect.value;
    const sortBy=sortSelect.value;

    let result=allCountries.filter((country)=>country.names.common.toLowerCase().includes(searchText)
);
if(region !=="all"){
    result=result.filter((country)=>country.region===region);
} 


result.sort((a, b) => {
    if (sortBy === "population-desc") return (b.population || 0) - (a.population || 0);
    if (sortBy === "population-asc") return (a.population || 0) - (b.population || 0);
    if (sortBy === "area-desc") return (b.area?.kilometers || 0) - (a.area?.kilometers || 0);
    return a.names.common.localeCompare(b.names.common);
  });

  renderCountries(app, result);
}

async function init(forceRefresh=false) {
    showLoading(app);
    try{
        allCountries=await getAllCountries(forceRefresh);
        fillRegionOptions(regionSelect,allCountries);
        applyFilters();
    }catch(error){
        showError(app,"Could not load countries. Check your internet and try again.",init);
    }
}
function debounce(fn ,delay){
    let timer;
    return ()=>{
        clearTimeout(timer);
        timer=setTimeout(fn,delay);
    };
}
 

searchInput.addEventListener("input", debounce(applyFilters, 300));
regionSelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
refreshButton.addEventListener("click",()=>init(true));
app.addEventListener("click",(event)=>{
    if(event.target.closest("[data-action='back']")){
        applyFilters();
        return;
    }
    const clicked=event.target.closest("[data-code]");
    if(!clicked) return;

    const country=allCountries.find((c)=>c.codes.alpha_3 === clicked.dataset.code);
    if(country){
        renderDetail(app,country,allCountries);
        window.scrollTo(0,0);
    }
});

init();


