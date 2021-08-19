'use strict';
const CountryAPIkey = keys.countryKey;
const WeatherApikey = keys.wetherKey;
class API {
  #weather_data;
  #CountryList;
  #StateList;
  #CityList;
  #SetWeather_Data(data) {
    this.#weather_data = data;
  }
  #GetWeather_Data() {
    return this.#weather_data;
  }
  #SetCountryList(data) {
    this.#CountryList = data;
  }
  #GetCountryList() {
    return this.#CountryList;
  }
  #SetStateList(data) {
    this.#StateList = data;
  }
  #GetStateList() {
    return this.#StateList;
  }
  #SetCityList(data) {
    this.#CityList = data;
  }
  #GetCityList() {
    return this.#CityList;
  }
  async getCountry() {
    const country = await fetch(
      `https://api.countrystatecity.in/v1/countries`,
      {
        headers: {
          'X-CSCAPI-KEY': `${CountryAPIkey}`,
        },
      }
    );
    this.#SetCountryList(await country.json());
    return this.#GetCountryList();
  }

  async getState(country) {
    const state = await fetch(
      `https://api.countrystatecity.in/v1/countries/${country}/states`,
      {
        headers: {
          'X-CSCAPI-KEY': `${CountryAPIkey}`,
        },
      }
    );
    this.#SetStateList(await state.json());
    return this.#GetStateList();
  }
  async getCity(state, country) {
    const City = await fetch(
      `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
      {
        headers: {
          'X-CSCAPI-KEY': `${CountryAPIkey}`,
        },
      }
    );
    this.#SetCityList(await City.json());
    return this.#GetCityList();
  }

  // Get Current Weather By Location
  async getcurrentWeather(lat, lon) {
    const weather =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WeatherApikey}
    `);
    this.#SetWeather_Data(await weather.json());
    return this.#GetWeather_Data();
  }

  // Get City Weather By Country and State
  async getWeater(country, state, city) {
    const City = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${WeatherApikey}`
    );
    this.#SetWeather_Data(await City.json());
    return this.#GetWeather_Data();
  }

  // Get City Weather  by City Name
  async getCityWeather(city) {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WeatherApikey}`
    );
    this.#SetWeather_Data(await weather.json());
    return this.#GetWeather_Data();
  }
}
