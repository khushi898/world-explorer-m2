const FAV_KEY="favorites";
export function getFavorites(){
    try{
        return JSON.parse(localStorage.getItem(FAV_KEY))||[];

    }catch{
        return [];
    }
}
export function isFavorite(code){
    return getFavorites().includes(code);
}
export function toggleFavorite(code){
    let favs=getFavorites();
    if(favs.includes(code)){
        favs=favs.filter((c)=>c !== code);
    }else{
        favs.push(code);
    }
    localStorage.setItem(FAV_KEY,JSON.stringify(favs));
}