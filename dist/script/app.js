// const keys = new KEYS();
const api = new API();
const ui = new UI();

function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const data = api.getcurrentWeather(latitude, longitude);
    data.then((weather) => ui.showWeather(weather.getdata(weather)));
  }

  function error() {
    console.log('Unable to retrieve your location');
  }

  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    console.log('Locating…');

    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// geoFindMe();

api.getCountry().then((data) => ui.ShowCountry(data));

const country = document.getElementById('country');
const state = document.getElementById('state');
const city = document.getElementById('city');
const btn = document.getElementById('getWeather');

function changeCountry(e) {
  ui.resetState();
  api.getState(e.value).then((data) => ui.ShowState(data));
}
function changeState(e) {
  ui.HideStateAndCity();
  api.getCity(e.value, country.value).then((data) => ui.ShowCity(data));
}
function changeCity(e) {
  ui.HideStateAndCity();
  console.log(e.value);
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  api
    .getWeater(country.value, state.value, city.value)
    .then((weather) => ui.showWeather(weather.getdata(weather)));
});
