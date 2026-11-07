import { isFavorite } from "./storage.js";
function createCard(country){
    const card =document.createElement('div');
    card.className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden";
    card.dataset.code=country.codes.alpha_3;
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
  
   const favButton=document.createElement("button");
   favButton.dataset.fav=country.codes.alpha_3;
   favButton.className="absolute top-2 right-2 bg-white rounded-full w-9 h-9 shadow text-xl";
   favButton.setAttribute("aria-label","Toggle favorite");
   favButton.textContent=isFavorite(country.codes.alpha_3)?"♥️":"♡";
   favButton.style.color=isFavorite(country.codes.alpha_3)?"red":"gray";
    card.append(flag,body,favButton);
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

export function showError(container,message,onRetry){
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

export function fillRegionOptions(select,countries){
    select.length=1;
    const regions=[...new Set(countries.map((country)=>country.region))].sort();

    regions.forEach((region)=>{
        const option=document.createElement('option');
        option.value=region;
        option.textContent=region;
        select.appendChild(option);
    });
}
function addInfo(parent, label, value) {
  const line = document.createElement("p");
  line.className = "mb-1";
  line.textContent = `${label}: ${value}`;
  parent.appendChild(line);
}



export function renderDetail(container, country, allCountries) {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "max-w-3xl mx-auto bg-white rounded-lg shadow p-6";

  const back = document.createElement("button");
  back.dataset.action = "back";
  back.className = "mb-4 text-blue-600 hover:underline";
  back.textContent = "← Back to all countries";

  const flag = document.createElement("img");
  flag.src = country.flag.url_png;
  flag.alt = `Flag of ${country.names.common}`;
  flag.className = "w-full max-h-64 object-contain mb-4";

  const title = document.createElement("h2");
  title.className = "text-2xl font-bold";
  title.textContent = country.names.common;

  const official = document.createElement("p");
  official.className = "text-gray-500 mb-4";
  official.textContent = country.names.official;

  const info = document.createElement("div");
  info.className = "mb-4";

  const capitals=country.capitals ||[];
  const capitalName = capitals.length > 0 ? capitals[0].name : "N/A";
  addInfo(info, "Region", `${country.region} — ${country.subregion || "N/A"}`);
  addInfo(info, "Capital", capitalName);
  addInfo(info, "Population", (country.population || 0).toLocaleString());
  addInfo(info, "Area", `${(country.area?.kilometers || 0).toLocaleString()} km²`);

  const currencies=country.currencies || [];
  const currencyText = currencies.length > 0
    ? currencies.map((cur) => `${cur.name} (${cur.symbol})`).join(", ")
    : "N/A";
  addInfo(info, "Currency", currencyText);

  const languages=country.languages || [];
  const languageText = languages.length > 0
    ?languages.map((lang) => lang.name).join(", ")
    : "N/A";
  addInfo(info, "Languages", languageText);

  const map = document.createElement("a");
  map.href = country.links?.google_maps||"#";
  map.target = "_blank";
  map.rel = "noopener noreferrer";
  map.className = "inline-block mb-4 text-blue-600 hover:underline";
  map.textContent = "View on Google Maps →";

  const bordersTitle = document.createElement("h3");
  bordersTitle.className = "font-semibold mb-2";
  bordersTitle.textContent = "Border countries";

  const chips = document.createElement("div");
  chips.className = "flex flex-wrap gap-2";

  const borders=country.borders ||[];
  if (country.borders.length === 0) {
    chips.textContent = "No land borders";
  } else {
    borders.forEach((code) => {
      const neighbour = allCountries.find((c) => c.codes.alpha_3 === code);
      if (!neighbour) return;

      const chip = document.createElement("button");
      chip.dataset.code = code;
      chip.className = "px-3 py-1 bg-gray-200 rounded-full hover:bg-blue-100 active:bg-blue-200";
      chip.textContent = neighbour.names.common;
      chips.appendChild(chip);
    });
  }

  wrapper.append(back, flag, title, official, info, map, bordersTitle, chips);
  container.appendChild(wrapper);
}