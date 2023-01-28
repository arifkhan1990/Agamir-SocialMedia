import React from 'react';
import './posts.css';
import { PostsData } from '../../data/PostsData.js';
import Post from '../post/Post';
const Posts = () => {
  return (
    <div className='Posts'>
      {PostsData.map((post, id) => {
        return <Post data={post} key={id} id={id} />;
      })}
    </div>
  );
};

export default Posts;
