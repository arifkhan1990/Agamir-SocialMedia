import React, { useState } from 'react';
import './post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { useSelector, useDispatch } from 'react-redux';
import { likePost } from '../../api/PostRequest';

const Post = ({ id, data }) => {
  const { user } = useSelector((state) => state.authReducer.authData.data);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  return (
    <div className='Post'>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''}
        alt={data.name}
      />
      <div className='postReact'>
        <img
          src={liked ? Heart : NotLike}
          alt=''
          style={{ cursor: 'pointer' }}
          onClick={handleLike}
        />
        <img src={Comment} alt='comment' />
        <img src={Share} alt='share' />
      </div>
      <span style={{ color: 'var(--gray)', fontSize: '13px' }}>
        {likes} likes
      </span>

      <div className='details'>
        <span>
          <b>{data.name}</b>
        </span>
        <span style={{ fontSize: '14px' }}> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
