function createCard(country){
    const card =document.createElement('div');
    card.className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden";
    const flag=document.createElement("img");
    flag.src=country.flag.url_png;
    flag.alt=`Flag of ${country.names.common}`;
    flag.className="w-full h-36 object-cover";
    flag.addEventListener("error", () => {
    const placeholder = document.createElement("div");
    placeholder.className = "w-full h-36 bg-gray-200 flex items-center justify-center text-gray-500";
    placeholder.textContent = "No flag available";
    flag.replaceWith(placeholder);
  });

    const body=document.createElement('div');
    body.className="p-4";

    const name=document.createElement('h2');
    name.className="font-bold text-lg mb-2";
    name.textContent=country.names.common;

    const population=document.createElement('p');
    population.textContent=`Population: ${country.population.toLocaleString()}`;
    const capital=document.createElement('p');
   const capitalName=country.capitals.length>0?country.capitals[0].name:"N/A";
   capital.textContent=`Capital: ${capitalName}`;

   body.append(name,population,capital);
   card.append(flag,body);
   return card;
}

export function renderCountries(container,countries){
    container.innerHTML="";

    const grid=document.createElement('div');
    grid.className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
    countries.forEach((country)=>{
        grid.appendChild(createCard(country));
    });
    container.appendChild(grid);
}