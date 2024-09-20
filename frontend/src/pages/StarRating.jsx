import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
  const starPercentage = (rating / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 0.25) * 0.25}%`;

  return (
    <div className="star-rating">
      <div className="stars-outer">
        <div className="stars-inner" style={{ width: starPercentageRounded }}></div>
      </div>
      <p><span className="rating-value">{rating}</span>/5</p>
    </div>
  );
};

export default StarRating;
