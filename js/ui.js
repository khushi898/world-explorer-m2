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

export function showLoading(container){
    container.innerHTML="";
    const message=document.createElement('p');
    message.className="text-center text-gray-500 py-20 animate-pulse";
    message.textContent="Loading countries...";
    container.appendChild(message);
}

export function showError(container,message){
    container.innerHTML="";
    const box=document.createElement('div');
    box.className="text-center py-20";

    const text=document.createElement('p');
    text.className="text-red-600 font-semibold mb-4";
    text.textContent=message;

    const button=document.createElement('button');
    button.className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600";
    button.textContent="Retry";
    button.addEventListener("click",onRetry);
    box.append(text,button);
    container.appendChild(box);
}