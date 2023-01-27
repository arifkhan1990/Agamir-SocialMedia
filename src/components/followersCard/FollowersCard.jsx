import React from 'react';
import './followersCard.css';

import { Followers } from '../../data/FollowersData';
const FollowersCard = () => {
  return (
    <div className='FollowerCard'>
      <h3>Who are following you</h3>

      {Followers.map((follower, id) => {
        return (
          <div className='follower'>
            <div>
              <img
                src={follower.img}
                alt={follower.username}
                className='followerImg'
              />
              <div className='name'>
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className='button fc-btn'>Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
