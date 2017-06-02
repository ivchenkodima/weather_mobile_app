import React, { Component } from 'react';
import './style.css';

import Background from '../Background'
import CurrentWeather from '../CurrentWeather'
import WeatherByTime from '../WeatherByTime'

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        country: 'country',
        city: 'city'
      },
      currentcast: {
        Temperature: 0,
        IconPhrase: "Fetching..."
      }
    }
  }
  componentDidMount() {
    const API_KEY = 'J7zbW3859BAcl8tGwwMzOGbAnTVut4W6';
    const REQUEST_URL = {
      search: "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
      forecast: "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/",
      autocomplete: "http://dataservice.accuweather.com/locations/v1/cities/autocomplete"
    }
    if(localStorage.getItem('weather-app')) this.setState(JSON.parse(localStorage.getItem('weather-app')))
    else if ("geolocation" in navigator) {
      let resultState = {};
      navigator.geolocation.getCurrentPosition((location) => {
        resultState = {
          timestamp: location.timestamp,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
        fetch(REQUEST_URL.search + '?apikey=' + API_KEY + '&q=' + location.coords.latitude + ',' + location.coords.longitude)
          .then((response) => response.json())
          .then((data) => {
            resultState = {
              ...resultState,
              location: {
                id: data.Country.ID,
                country: data.Country.EnglishName,
                city: data.EnglishName
              },
              weatherKey: data.Key
            }
            return fetch(REQUEST_URL.forecast + data.Key + '?apikey=' + API_KEY)
          })
          .then((response) => response.json())
          .then((data) => {
            resultState.currentcast = data[0];
            data.splice(0, 1);
            resultState.forecast = data;
            localStorage.setItem('weather-app', JSON.stringify(resultState));
            this.setState(resultState);
          });
      });
    }
  }
  render() {
    console.log(this.state);
    let {city, country} = this.state.location,
        {Temperature, IconPhrase} = this.state.currentcast;

    Temperature = Math.floor((Temperature.Value - 32) * 5 / 9);
    return (
      <div className="App">
        <CurrentWeather>
          <Background/>
          <p>{city}, {country}</p>
          <h2>{IconPhrase}</h2>
          <h1>{Temperature}°</h1>
        </CurrentWeather>
        <WeatherByTime data={this.state.forecast}/>
      </div>
    );
  }
}

export default App;
