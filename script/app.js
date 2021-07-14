// const keys = new KEYS();
const api = new API();
const ui = new UI();

const country = document.getElementById('country');
const state = document.getElementById('state');
const city = document.getElementById('city');
const btn = document.getElementById('getWeather');
const searchCity = document.getElementById('searchCity');
const SerachCity = document.getElementById('searchWeather');

//Find location based on location Requires permission
function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(longitude);
    const data = api.getcurrentWeather(latitude, longitude);
    data.then((weather) => ui.showWeather(weather.getdata(weather)));
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
//call function
geoFindMe();

// get List of Countries
api.getCountry().then((data) => ui.ShowCountry(data));

//Add State List On select on Country
function changeCountry(e) {
  //Reset State And City Based on Country Change
  ui.resetState();
  api.getState(e.value).then((data) => ui.ShowState(data));
}
//Add City List On select on Country
function changeState(e) {
  ui.HideStateAndCity();
  api.getCity(e.value, country.value).then((data) => ui.ShowCity(data));
}
function changeCity(e) {
  btn.disabled = false;
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  ui.clearStates();
  api
    .getWeater(country.value, state.value, city.value)
    .then((weather) => ui.showWeather(weather.getdata(weather)));
});

SerachCity.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(searchCity.value);
  const data = api.getCityWeather(searchCity.value);
  data.then(async (weather) => {
    await ui.clearStates();
    ui.showWeather(weather.getdata(weather));
  });
});
