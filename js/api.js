const BASE_URL="https://api.restcountries.com/countries/v5";
const API_KEY="rc_live_bb7bde7bbbf54442859236c19d7d1d8a";
const FIELDS="names.common,names.official,flag.url_png,population,capitals,region,subregion,area.kilometers,codes.alpha_3,borders,currencies,languages,links.google_maps";
const CACHE_KEY="countries-v2";
export async function getAllCountries(forceRefresh=false){

    const cached=sessionStorage.getItem(CACHE_KEY);
    if(cached && !forceRefresh){
        return JSON.parse(cached);
    }
    let allCountries=[];
    let offset=0;
    let more=true;
    while(more){
        const url=`${BASE_URL}?limit=100&offset=${offset}&response_fields=${FIELDS}`;
        const response=await fetch(url,{
            headers:{"Authorization":`Bearer ${API_KEY}`},
        });
        if(!response.ok){
            throw new Error("Could not load countries");
        }
        const result=await response.json();
        allCountries=allCountries.concat(result.data.objects);
        more=result.data.meta.more;
        offset+=100;
    }
    sessionStorage.setItem(CACHE_KEY,JSON.stringify(allCountries));
    return allCountries;
}
