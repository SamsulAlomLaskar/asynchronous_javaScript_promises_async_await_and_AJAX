"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

//? src attribute of html is asynchronous in nature - once the image gets load the JS then emit the load event & then we can listen to that event

//* AJAX call
/* 
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

 */

///////////////////////////////////////

//? src attribute of html is asynchronous in nature - once the image gets load the JS then emit the load event & then we can listen to that event

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
      <p class="country__row"><span>🗣️</span>${data.languages[languageKey]}</p>
      <p class="country__row"><span>💰</span>${
        data.currencies[currencyKey].name
      }</p>
        </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

//* AJAX call for country 1
/* 
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    //! Render country 1
    renderCountry(data);

    //? get neighbour country
    const [neighbour] = data.borders;
    console.log(neighbour);

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);

    request2.send();

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, "neighbour");
    });
  });
};

getCountryAndNeighbour("india"); */
// getCountryAndNeighbour("usa");

// Domain name is validated by the DNS with the original IP address

//? Call back hell is defined as when there's a lot of nested call back's in order to execute an asynchronous task in sequence - it makes our code hard to maintain & difficult to understand

//*Life cycle of promise

/*
! Promise
 const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) =>

      ! json() method is available in all the responses of the fetch method (result value) & it also returns a promise
      response.json()
    )
    .then((data) => renderCountry(data[0]));
};
 */

//! Chaining Promise

//* then() always returns promise no matter if we actually return anything or not, but if we do return a value than that value will become the fulfillment value of the return promise

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);

      const [neighbour] = data[0].borders;

      if (!neighbour) return;

      fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then((result) => result.json())
        .then((data) => {
          renderCountry(data[0], "neighbour");
        });
    });
};
getCountryData("india");
