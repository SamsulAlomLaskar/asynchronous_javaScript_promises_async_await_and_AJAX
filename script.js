"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

//? src attribute of html is asynchronous in nature - once the image gets load the JS then emit the load event & then we can listen to that event

//* AJAX call

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  // request.open("GET", "https://restcountries.com/v2/name/india");

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    const [currencyKey] = Object.keys(data.currencies);

    const html = ` 
  <article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[currencyKey].name
        }</p>
        </div>
        </article>
        `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("india");
getCountryData("usa");
