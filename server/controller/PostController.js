import PostModel from '../mongoDB/models/postModel.js';
import UserModel from '../mongoDB/models/userModel.js';
import mongoose from 'mongoose';
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res
      .status(200)
      .json({ status: true, msg: 'Post created Successfully!', post: newPost });
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    if (post) {
      res.status(200).json({ status: true, post: post });
    } else {
      res.status(404).json({ status: true, msg: 'Post are not Found!' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    if (posts) {
      res.status(200).json({ status: true, posts: posts });
    } else {
      res.status(404).json({ status: true, msg: 'Posts are not Found!' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await PostModel.updateOne({ $set: req.body });
      res.status(200).json({ status: true, msg: 'Post Updated!' });
    } else {
      res.status(403).json({ status: false, msg: 'Action forbidden' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await PostModel.findByIdAndDelete(postId);
      res.status(200).json({ status: true, msg: 'Post deleted successfully!' });
    } else {
      res.status(403).json({ status: false, msg: 'Action forbidden' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ status: true, msg: 'Post liked!' });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ status: true, msg: 'Post UnLiked!' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const disLikePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ status: true, msg: 'Post UnLiked!' });
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ status: true, msg: 'Post liked!' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const getTimeLinePost = async (req, res) => {
  const userId = req.params.id;

  try {
    const currUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'followingPosts',
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json({
      status: true,
      posts: currUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        }),
    });
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};
