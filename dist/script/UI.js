class UI {
  constructor() {
    this.country = document.getElementById('country');
    this.state = document.getElementById('state');
    this.city = document.getElementById('city');
    this.weather = document.getElementById('Weather_status');
    this.description = document.getElementById('description');
    this.details = document.getElementById('details').querySelectorAll('li');
    this.visibility = document.getElementById('visibility');
    this.wind = document.getElementById('wind').querySelectorAll('li');
  }
  ShowCountry(countries) {
    let html = `<option valur="null"> Select Country</option>`;
    countries.CountryList.map((country) => {
      html = html + `<option value="${country.iso2}">${country.name}</option>`;
    });
    this.country.innerHTML = html;
  }
  ShowState(states) {
    let html = '';

    states.StateList.map((state) => {
      html = html + `<option value="${state.iso2}">${state.name}</option>`;
    });
    this.state.innerHTML = html;
    this.state.style = 'block';
  }
  ShowCity(city) {
    let html = '';
    console.log(city);
    city.CityList.map((state) => {
      html = html + `<option value="${state.name}">${state.name}</option>`;
    });
    this.city.innerHTML = html;
    this.city.style = 'block';
  }
  resetState() {
    this.state.innerHTML = '<option valur="null"> Select State</option>';
    this.city.innerHTML = '<option valur="null"> Select City</option>';
  }
  HideStateAndCity() {
    // this.state.style = "none";
    // this.city.style = "none";
  }
  showWeather(data) {
    this.weather.append(data.name + ' | ' + data.weather[0]?.main);
    this.description.append(' ' + data.weather[0]?.description.toUpperCase());
    this.description;
    this.details[0].append(data.main?.temp);
    this.details[1].append(data.main?.feels_like);
    this.details[2].append(data.main?.pressure);
    this.details[3].append(data.main?.humidity);
    this.details[4].append(data.main?.sea_level);
    this.visibility.append(data?.visibility);
    this.wind[0].append(data.wind?.speed);
    this.wind[1].append(data.wind?.deg);
    this.wind[2].append(data.wind?.gust);
    const span = document.createElement('span');
    span.innerHTML = ' &#8451;';
    this.wind[1].appendChild(span);
  }
}
