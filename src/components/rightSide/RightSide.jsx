import React from 'react';
import './rightSide.css';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from '../trendCard/TrendCard';
const RightSide = () => {
  return (
    <div className='RightSide'>
      <div className='navIcons'>
        <img src={Home} alt='home' />
        <UilSetting />
        <img src={Noti} alt='notic' />
        <img src={Comment} alt='comment' />
      </div>
      <TrendCard />
      <button className='button r-btn'>Share</button>
    </div>
  );
};

export default RightSide;
