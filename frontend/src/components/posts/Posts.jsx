import React, { useEffect } from 'react';
import './posts.css';
import Post from '../post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeLinePosts } from '../../actions/PostAction';

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData.data);
  const { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimeLinePosts(user._id));
  }, []);

  return (
    <div className='Posts'>
      {loading
        ? 'Fetching Data...'
        : posts?.posts.map((post, id) => {
            return <Post data={post} key={post._id} id={post._id} />;
          })}
    </div>
  );
};

export default Posts;
