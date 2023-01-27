import React from 'react';
import './profileCard.css';
import Cover from '../../img/cover.jpg';
import Profile from '../../img/profileImg.jpg';
const ProfileCard = () => {
  return (
    <div className='ProfileCard'>
      <div className='ProfileImages'>
        <img src={Cover} alt='cover img' />
        <img src={Profile} alt='profile img' />
      </div>
      <div className='ProfileName'>
        <span>Arif Khan</span>
        <span>Senior Software Engineer</span>
      </div>
      <div className='followStatus'>
        <hr />
        <div>
          <div className='follow'>
            <span>559</span>
            <span>Followings</span>
          </div>
          <div className='v-line'></div>
          <div className='follow'>
            <span>6,157</span>
            <span>Follower</span>
          </div>
        </div>
        <hr />
      </div>
      <span>My Profile</span>
    </div>
  );
};

export default ProfileCard;
