import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ rating = 0, reviewsCount, showCount = true, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  
  return (
    <div className="rating-stars-wrapper" title={`Rating: ${rating} out of 5`}>
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= fullStars;
          const isHalf = starIndex === fullStars + 1 && hasHalfStar;

          return (
            <span key={starIndex} style={{ display: 'inline-flex' }}>
              <Star
                size={size}
                fill={isFilled ? '#fbbf24' : 'none'}
                stroke={isFilled || isHalf ? '#fbbf24' : '#64748b'}
                strokeWidth={1.75}
              />
            </span>
          );
        })}
      </div>
      <span className="rating-score">{Number(rating).toFixed(1)}</span>
      {showCount && reviewsCount && (
        <span className="rating-count">({reviewsCount.toLocaleString()})</span>
      )}
    </div>
  );
};

export default Rating;
