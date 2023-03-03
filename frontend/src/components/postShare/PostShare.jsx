import React from 'react';
import './postShare.css';
import ProfileImage from '../../img/profileImg.jpg';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImg, uploadPost } from '../../actions/UploadAction';
const PostShare = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const { user } = useSelector((state) => state.authReducer.authData.data);
  const desc = useRef();
  console.log({ user });
  const onImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append('name', fileName);
      data.append('file', image);
      newPost.image = fileName;
      // console.log(newPost);
      try {
        dispatch(uploadImg(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };
  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = '';
  };
  return (
    <div className='PostShare'>
      <img src={ProfileImage} alt='' />
      <div>
        <input type='text' required ref={desc} placeholder="What's happening" />
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
          <button
            className='button ps-btn'
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Share'}
          </button>
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
            <img src={URL.createObjectURL(image)} alt='' />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
