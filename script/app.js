'use strict';
const api = new API();
const ui = new UI();

const country = document.getElementById('country');
const state = document.getElementById('state');
const city = document.getElementById('city');
const btn = document.getElementById('getWeather');
const CityName = document.getElementById('searchCity');
const SerachCity = document.getElementById('searchWeather');
const Alertbtn = document.getElementById('Alertbtn');

//media
const query = window.matchMedia('(max-width: 600px)');

//Find location based on location Requires permission
function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const data = api.getcurrentWeather(latitude, longitude);
    data.then((weather) => ui.showWeather(weather));
  }
  function error() {
    console.log('Unable to retrieve your location');
  }
  if (!navigator.geolocation) {
    alert('Allow Location Permisson for Location Weather');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

//Add State List On select on Country
function changeCountry(e) {
  //Reset State And City Based on Country Change
  ui.resetState();
  api.getState(e.value).then((data) => {
    if (data.length > 0) ui.ShowState(data);
    else {
      data.push({
        id: 0,
        name: 'Search By City States Not Available ',
        iso2: 'None',
      });
      ui.ShowState(data);
    }
  });
}
//Add City List On select on Country
function changeState(e) {
  ui.HideStateAndCity();
  api.getCity(e.value, country.value).then((data) => ui.ShowCity(data));
}
//Activate the Weathe Btn
function changeCity(e) {
  btn.disabled = false;
}

// Get Wether By County state and City
btn.addEventListener('click', (e) => {
  e.preventDefault();
  ui.showLoader();
  ui.hideAlert();
  if (query.matches) {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
  api
    .getWeater(country.value, state.value, city.value)
    .then(async (weather) => {
      if (weather?.cod === '404') {
        ui.showAlert(city.value);
      } else {
        await ui.clearStates();
        ui.showWeather(weather);
      }
    });
  setTimeout(() => {
    ui.HideLoader();
  }, 2000);
});

//Get Weather By City Name
SerachCity.addEventListener('submit', (e) => {
  e.preventDefault();
  ui.showLoader();
  ui.hideAlert();
  if (query.matches) {
    window.scroll({
      top: 10,
      behavior: 'smooth',
    });
  }
  api.getCityWeather(CityName.value).then(async (weather) => {
    if (weather?.cod === '404') {
      ui.showAlert(CityName.value);
    } else {
      await ui.clearStates();
      ui.showWeather(weather);
    }
  });
  setTimeout(() => {
    ui.HideLoader();
  }, 2000);
});

Alertbtn.addEventListener('click', (e) => {
  e.preventDefault();
  ui.hideAlert();
});

// Init

//call function at start for Location Weather
geoFindMe();

// get List of Countries
api.getCountry().then((data) => ui.ShowCountry(data));
