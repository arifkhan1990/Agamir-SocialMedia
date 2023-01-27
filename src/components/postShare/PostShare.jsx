import React from 'react';
import './postShare.css';
import ProfileImage from '../../img/profileImg.jpg';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { useState, useRef } from 'react';
const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };
  return (
    <div className='PostShare'>
      <img src={ProfileImage} alt='' />
      <div>
        <input type='text' placeholder="What's happening" />
        <div className='postOptions'>
          <div
            className='option'
            style={{ color: 'var(--photo)' }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className='option' style={{ color: 'var(--video)' }}>
            <UilPlayCircle />
            Video
          </div>
          <div className='option' style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
          </div>
          <div className='option' style={{ color: 'var(--shedule)' }}>
            <UilSchedule />
            Shedule
          </div>
          <button className='button ps-btn'>Share</button>
          <div style={{ display: 'none' }}>
            <input
              type='file'
              name='myImg'
              ref={imageRef}
              onChange={onImgChange}
            />
          </div>
        </div>
        {image && (
          <div className='previewImg'>
            <UilTimes onClick={() => setImage(null)} />
            <img src={image.image} alt='' />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
