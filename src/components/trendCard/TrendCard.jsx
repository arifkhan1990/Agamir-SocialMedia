import React from 'react';
import './trendCard.css';
import { TrendData } from '../../data/TrendData.js';
const TrendCard = () => {
  return (
    <div className='TrendCard'>
      <h3>Trends for you</h3>
      {TrendData.map((trend, id) => (
        <div className='trend' key={id}>
          <span>#{trend.name}</span>
          <span>{trend.shares}k Shares</span>
        </div>
      ))}
    </div>
  );
};

export default TrendCard;
