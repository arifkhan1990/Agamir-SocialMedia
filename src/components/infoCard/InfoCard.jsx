import React from 'react';
import './infoCard.css';
import { UilPen } from '@iconscout/react-unicons';
const InfoCard = () => {
  return (
    <div className='InfoCard'>
      <div className='infoHead'>
        <h4>Your Info</h4>
        <div>
          <UilPen width='2rem' height='1.2rem' />
        </div>
      </div>
      <div className='info'>
        <span>
          <b>Status </b>
        </span>
        <span>In Relationship</span>
      </div>

      <div className='info'>
        <span>
          <b>Lives in </b>
        </span>
        <span>Dhaka, Bangladesh</span>
      </div>

      <div className='info'>
        <span>
          <b>Works at </b>
        </span>
        <span>Entertech</span>
      </div>
      <div className='info'>
        <span>
          <b>Birthday </b>
        </span>
        <span>4th June</span>
      </div>
      <button className='button info-btn'>Logout</button>
    </div>
  );
};

export default InfoCard;
