//? Async & await

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //
};

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  //? Error Handling
  try {
    // Geo location
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geo coding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=72782002113893264204x116995`
    );
    if (!resGeo.ok) throw new Error("Problem in getting location data");

    const dataGeo = await resGeo.json();

    const resp = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!resp.ok) throw new Error("Problem in getting country");
    const data = await resp.json();
    renderCountry(data[0]);

    //? returning values from async function
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    renderError(err.message);

    // reject promise returned from async function
    throw err;
  }
};

console.log("Will get location");
// const city = whereAmI();
// console.log(city);
/*
 whereAmI()
  .then((city) => console.log(city))
  .catch((err) => console.error(err.message))
  .finally(() => console.log("Finished getting the location"));
   */

// whereAmI()
//   .then((city) => console.log(city))
//   .catch((err) => console.error(err.message))
//   .finally(() => console.log("Finished getting the location"));

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.error(err.message);
  }
  console.log("Finished getting the location");
})();

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    //! Error handling

    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }

    return response.json();
  });
};

const getThreeCountries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // Promise.all() takes an array of promises & returns a new promise, which will than run all the promises in the array at the same time

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.flatMap((d) => d[0].capital));

    // console.log(data1.capital, data2.capital, data3.capital);
  } catch (error) {
    console.error(error);
  }
};

getThreeCountries("india", "canada", "tanzania");
