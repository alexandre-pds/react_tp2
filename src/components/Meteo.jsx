// Meteo.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Meteo.css";
import MeteoCard from './MeteoCard';


const Meteo = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const citiesData = await Promise.all([
          getCityWeather('Paris'),
          getCityWeather('London'),
          getCityWeather('New York'),
          getCityWeather('Tokyo'),
          getCityWeather('Sydney')
        ]);
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const getCityWeather = async (cityName) => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      const { name, sys, main, wind } = response.data;
      const cityData = {
        name,
        postalCode: sys.country,
        temperature: main.temp,
        tempMax: main.temp_max,
        tempMin: main.temp_min,
        windSpeed: wind.speed
      };
      return cityData;
    } catch (error) {
      console.error('Error fetching weather data for', cityName, ':', error);
      return null;
    }
  };

  return (
    <div className="meteo-container">
      <h1>Weather App</h1>
      <h2>Choose a city:</h2>
      <div className="card-container">
        {cities.map(city => (
          <MeteoCard key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Meteo;
