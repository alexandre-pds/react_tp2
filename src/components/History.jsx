// History.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/History.css";
import MeteoCard from './MeteoCard';

const History = () => {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const [citiesData, setCitiesData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const citiesData = await getAllCitiesWeather(searchHistory);
        setCitiesData(citiesData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [searchHistory]);

  const getAllCitiesWeather = async (cityNames) => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const citiesData = [];

    for (const cityName of cityNames) {
      const cityData = await getCityWeather(cityName, apiKey);
      citiesData.push(cityData);
    }

    return citiesData;
  };

  const getCityWeather = async (cityName, apiKey) => {
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

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredCities = citiesData.filter(city =>
    city.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="history-container">
      <h2>Search History</h2>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search by city name"
      />
      {searchHistory.length > 0 ? (
        <div className="card-container">
          {filteredCities.map((city, index) => (
            <MeteoCard key={index} city={city} />
          ))}
        </div>
      ) : (
        <p>No search history available.</p>
      )}
    </div>
  );
};

export default History;
