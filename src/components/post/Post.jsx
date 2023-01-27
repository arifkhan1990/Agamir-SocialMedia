import React from 'react';
import './post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
const Post = ({ id, data }) => {
  return (
    <div className='Post'>
      <img src={data.img} alt={data.name} />
      <div className='postReact'>
        <img src={data.liked ? Heart : NotLike} alt='' />
        <img src={Comment} alt='comment' />
        <img src={Share} alt='share' />
      </div>
      <span style={{ color: 'var(--gray)', fontSize: '13px' }}>
        {data.likes} likes
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
