import UserModel from '../mongoDB/models/userModel.js';
import bcrypt from 'bcrypt';
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json({ status: true, user: otherDetails });
    } else {
      res.status(404).json({ status: false, msg: 'User not found!' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    if (users) {
      res.status(200).json({ status: true, users: users });
    } else {
      res.status(404).json({ status: false, msg: 'No User are found!' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currUserId, currUserAdminStatus, password } = req.body;

  if (id === currUserId || currUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ status: true, user: user });
    } catch (error) {
      res.status(500).json({ status: false, err: error.message });
    }
  } else {
    res.status(403).json({
      status: false,
      msg: 'Access denied! you can only update your own profile.',
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currUserId, currUserAdminStatus } = req.body;

  if (currUserId === id || currUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json({ status: true, msg: 'User deleted successfully!' });
    } catch (error) {
      res.status(500).json({ status: false, err: error.message });
    }
  } else {
    res.status(403).json({
      status: false,
      msg: 'Access denied! you can only update your own profile.',
    });
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currUserId } = req.body;

  if (currUserId === id) {
    res.status(403).json({ status: false, msg: 'Action forbidden' });
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currUserId);

      if (!followUser.followers.includes(currUserId)) {
        await followUser.updateOne({ $push: { followers: currUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json({ status: true, msg: 'User followed!' });
      } else {
        res
          .status(403)
          .json({ status: false, msg: 'User is Already followed by you.' });
      }
    } catch (error) {
      res.status(500).json({ status: false, err: error.message });
    }
  }
};

export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currUserId } = req.body;

  if (currUserId === id) {
    res.status(403).json({ status: false, msg: 'Action forbidden' });
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currUserId);

      if (followUser.followers.includes(currUserId)) {
        await followUser.updateOne({ $pull: { followers: currUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json({ status: true, msg: 'User Unfollowed!' });
      } else {
        res
          .status(403)
          .json({ status: false, msg: 'User is not followed by you.' });
      }
    } catch (error) {
      res.status(500).json({ status: false, err: error.message });
    }
  }
};
