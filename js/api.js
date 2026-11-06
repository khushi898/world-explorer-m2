const BASE_URL="https://api.restcountries.com/countries/v5";
const API_KEY="rc_live_bb7bde7bbbf54442859236c19d7d1d8a";
const FIELDS="names.common,flag.url_png,population,capitals,region,area.kilometers,codes.alpha_3";
export async function getAllCountries(){
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
    return allCountries;
}
