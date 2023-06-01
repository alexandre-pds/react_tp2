// Search.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "../styles/Search.css";
import MeteoCard from './MeteoCard';

const Search = () => {
  const [cityData, setCityData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityName = searchParams.get('city');

  useEffect(() => {
    if (cityName) {
      getCityWeather(cityName);
      setSearchValue(cityName);
    }
  }, [cityName]);

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
      setCityData(cityData);

      // Ajouter la recherche à l'historique
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }
    } catch (error) {
      console.error('Error fetching weather data for', cityName, ':', error);
      setCityData(null);
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      getCityWeather(searchValue);
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-container">
      <h2>Weather Search</h2>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Enter a city name"
      />
      <button onClick={handleSearch}>Search</button>
      {cityData ? (
        <MeteoCard city={cityData} />
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default Search;
