const clearElement = (element) => {
  element.innerHTML = '';
};
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
  clearStates() {
    console.log('here');
    clearElement(this.weather);
    clearElement(this.description);
    clearElement(this.details[0]);
    clearElement(this.details[1]);
    clearElement(this.details[2]);
    clearElement(this.details[3]);
    clearElement(this.details[4]);
    clearElement(this.visibility);
    clearElement(this.wind[0]);
    clearElement(this.wind[1]);
  }

  showWeather(data) {
    console.log(data);
    this.weather.append(data.name + ' | ' + data.weather[0]?.main);
    this.description.append(
      'Weather description : ' + data.weather[0]?.description.toUpperCase()
    );
    this.details[0].append('Temp :' + (data.main?.temp || 'Not available'));
    this.details[1].append(
      'feels_like :' + (data.main?.feels_like || 'Not available')
    );
    this.details[2].append(
      'Pressure :' + (data.main?.pressure || 'Not available')
    );
    this.details[3].append(
      'Humidity :' + (data.main?.humidity || 'Not available')
    );
    this.details[4].append(
      'Sea level  :' + (data.main.sea_level || 'Not available')
    );
    this.visibility.append(
      'Visibility :' + (data?.visibility || 'Not available')
    );
    this.wind[0].append('Speed :' + data.wind?.speed);
    this.wind[1].append('Degree :' + data.wind?.deg);
    // this.wind[2].append('Gust : ' + data.wind?.gust);
    const span = document.createElement('span');
    span.innerHTML = ' &#8451;';
    this.wind[1].appendChild(span);
  }
}
