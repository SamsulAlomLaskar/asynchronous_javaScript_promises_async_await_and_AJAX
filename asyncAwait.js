//? Async & await

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  // Geo location
  const pos = await getPosition();

  const { latitude: lat, longitude: lng } = pos.coords;

  // Reverse Geo coding
  const resGeo = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=72782002113893264204x116995`
  );

  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  const resp = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  const data = await resp.json();
  console.log(data);
  renderCountry(data[0]);
};

console.log("first");
whereAmI();
console.log("second");

const renderCountry = function (data, className = "") {
  const [currencyKey] = Object.keys(data.currencies);
  const [languageKey] = Object.keys(data.languages);

  const html = ` 
      <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[languageKey]
        }</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[currencyKey].name
        }</p>
          </div>
          </article>
          `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};
