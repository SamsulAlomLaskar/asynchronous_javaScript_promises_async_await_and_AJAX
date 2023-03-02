const renderCountry1 = function (data, className = "") {
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

const getCountry = (country) => {
  return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) throw new Error("No city found");

      return response.json();
    })
    .then((data) => {
      renderCountry1(data[0]);
    });
};

const whereAmI = function (lat, lng) {
  return fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=72782002113893264204x116995`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error with the geo coding ${response.status}`);

      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.country}`);

      getCountry(data.country);
    })
    .catch((err) => {
      console.error(err.message);
    });
};

whereAmI(12.9372, 77.58);
whereAmI(52.508, 13.381);
whereAmI(-33.933, 18.474);
