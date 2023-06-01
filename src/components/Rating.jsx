import React from 'react';

const Rating = ({ type, value }) => {
  let ratingElement;

  if (type === "stars") {
    const stars = "★".repeat(value);
    ratingElement = <div>{stars} étoiles</div>;
  } else if (type === "smileys") {
    const smileys = "😄".repeat(value);
    ratingElement = <div>{smileys} smileys</div>;
  } else {
    ratingElement = <div>Notation non prise en charge</div>;
  }

  return ratingElement;
};

export default Rating;
