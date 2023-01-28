import React from 'react';
import Posts from '../posts/Posts';
import PostShare from '../postShare/PostShare';
import './postSide.css';

const PostSide = () => {
  return (
    <div className='PostSide'>
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;
