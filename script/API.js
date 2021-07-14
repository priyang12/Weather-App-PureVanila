class API {
  async getCountry() {
    const country = await fetch(
      `https://api.countrystatecity.in/v1/countries`,
      {
        headers: {
          'X-CSCAPI-KEY': ``,
        },
      }
    );
    const CountryList = await country.json();

    return {
      CountryList,
    };
  }

  async getState(country) {
    const state = await fetch(
      `https://api.countrystatecity.in/v1/countries/${country}/states`,
      {
        headers: {
          'X-CSCAPI-KEY': `CountrylistAPIKey`,
        },
      }
    );
    const StateList = await state.json();
    return {
      StateList,
    };
  }
  async getCity(state, country) {
    const City = await fetch(
      `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
      {
        headers: {
          'X-CSCAPI-KEY': `CountrylistAPIKey`,
        },
      }
    );
    const CityList = await City.json();

    return {
      CityList,
    };
  }
  async getWeater(country, state, city) {
    console.log(country, state, city);
    const City = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=weatherAPI`
    );
    const weather_data = await City.json();
    function getdata() {
      return weather_data;
    }
    return { getdata };
  }
  async getcurrentWeather(lat, lon) {
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=weatherAPI
    `);
    const weather_data = await weather.json();
    function getdata() {
      return weather_data;
    }
    return { getdata };
  }
  async getCityWeather(city) {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=weatherAPI`
    );
    const weather_data = await weather.json();
    function getdata() {
      return weather_data;
    }
    return { getdata };
  }
}
