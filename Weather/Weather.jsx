import React, { useState } from 'react';
import './Weather.css';
import search_icon from '../ass/search.png';
import clear_icon from '../ass/clear.png';
import cloud_icon from '../ass/cloud.png';
import drizzle_icon from '../ass/drizzle.png';
import rain_icon from '../ass/rain.png';
import snow_icon from '../ass/snow.png';
import humidity_icon from '../ass/humidity.png';
import wind_icon from '../ass/wind.png';

const Weather = () => {
  let api_key = '1d576a90756f34f2e54c1191e12adedb';
  const [wicon, setWicon] = useState(cloud_icon);
  const search = async () => {
    const element = document.getElementsByClassName('cityInput');
    if (element[0].value === '') {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      const humidity = document.getElementsByClassName('humidity-rate');
      const wind = document.getElementsByClassName('wind-rate');
      const temperature = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');

      humidity[0].innerHTML = `${data.main.humidity}%`;
      wind[0].innerHTML = `${Math.floor(data.wind.speed)} km/h`;
      temperature[0].innerHTML = `${Math.floor(data.main.temp)}°C`;
      location[0].innerHTML = data.name;
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === "013d" || data.weather[0].icon === "13n") {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='search' />
        <div className='search' onClick={() => { search() }}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="" className='icon' />
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className="element">
          <img src={humidity_icon} alt="" className='icon' />
          <div className='data'>
            <div className="humidity-rate">64</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className='icon' />
          <div className='data'>
            <div className="wind-rate">18km/h</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;