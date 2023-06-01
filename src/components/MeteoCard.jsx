// MeteoCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MeteoCard = ({ city }) => {
  return (
    <div className="card">
      <Link to={`/search?city=${city.name}`}>
        <h3>{city.name} ({city.postalCode})</h3>
      </Link>
      <p>Temperature: {city.temperature}°C</p>
      <p>Max Temperature: {city.tempMax}°C</p>
      <p>Min Temperature: {city.tempMin}°C</p>
      <p>Wind Speed: {city.windSpeed} m/s</p>
    </div>
  );
};

MeteoCard.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    windSpeed: PropTypes.number.isRequired
  }).isRequired
};

export default MeteoCard;
