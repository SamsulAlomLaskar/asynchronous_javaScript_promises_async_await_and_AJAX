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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //
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

const getJSON = function (url, errorMsg = "Something went wrong") {
  console.log(url);
  return fetch(url).then((response) => {
    // console.log(url);
    // console.log(response);
    // console.log(response.status);
    // console.log(response.json());
    console.log(response.ok);
    //! Error handling

    if (!response.ok) {
      console.log("1");
      throw new Error(`${errorMsg} (${response.status})`);
    }

    return response.json();
  });
};

const getCountryData = function (country) {
  //? handling promise rejections

  return getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    "country not found"
  )
    .then((data) => {
      renderCountry(data[0]);

      const [neighbour] = data[0].borders;

      if (!neighbour) throw new Error("No neighbour found");

      //! neighbour

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        "country not found"
      ).then((data) => {
        renderCountry(data[0], "neighbour");
      });
    })
    .catch((err) => {
      renderError(`Something went wrong ${err.message}. Try again`);
      console.error(err);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

/* 
const getCountryData = function (country) {
  //? handling promise rejections

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      console.log(response);
      console.log(response.status);
      //! Error handling

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);

      const [neighbour] = data[0].borders;

      if (!neighbour) return;

      fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then((result) => result.json())
        .then((data) => {
          renderCountry(data[0], "neighbour");
        });
    })
    .catch((err) => {
      renderError(`Something went wrong ${err.message}. Try again`);
      console.error(err);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
      console.log("finally");
    });
};
 */

// btn.addEventListener("click", function () {
//   getCountryData("india");
// });
// getCountryData(" ");

//? Asynchronour eventss Event loop , callback queue in case of promise
//* callback of promises doesn't go to callback queue,  once the fetch is done in the WEB APIs then the task moves to microtask queue ( it has the priority over the callback queue), the event loop will check if there's any task pending in MICROTASKS QUEUE, if available then it executes all the task before the callback queue's tasks

//! Event Loop

console.log("Test start"); // 1
setTimeout(() => console.log("0 sec later"), 0); // 5
Promise.resolve("Resolved promise 1").then((res) => console.log(res)); // 3
Promise.resolve("Resolved promise 2").then((res) => {
  for (let i = 0; i < 1000; i++) {
    // console.log(i + 1);
  }
  console.log(res);
}); // 4
console.log("test end"); //2

//* Promise using new Promise constuctor (takes only one argument & that is the executer function & the function takes two arguments resolve & reject)

const lottery = new Promise(function (resolve, reject) {
  // this function will contain the async behaviour that we are trying to handle with the promise

  console.log("Lottery draw is happening");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You WON");
    } else {
      reject(new Error("You Loose"));
    }
  }, 2000);
});

lottery
  .then((result) => console.log(result))
  .catch((err) => console.error(err));

//* Promsifying setTimeout
const wait = function (secs) {
  return new Promise((resolve, _) => {
    setTimeout(resolve, secs * 1000);
  });
};

wait(2)
  .then(() => {
    console.log("I waited for 2 sec");
    return wait(1);
  })
  .then(() => console.log("I waited for 1 sec"));

wait(1)
  .then(() => {
    console.log("1 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("2 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("3 second passed");
    return wait(1);
  })
  .then(() => console.log("4 second passed"));

Promise.resolve("Samsul").then((aa) => console.log(aa));
Promise.reject(new Error("Alom")).catch((aa) => console.error(aa));

const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position),
    //   (err) => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then((res) => console.log(res))
  .catch((err) => console.log(rej));

console.log("getting the geo location");

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=72782002113893264204x116995`
      );
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error with the geo coding ${response.status}`);

      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => {
      console.error(err.message);
    });
};

btn.addEventListener("click", whereAmI);
