import UserModel from '../mongoDB/models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const registerUser = async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  try {
    const user = await newUser.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    res.status(200).json({ status: true, data: { user, token } });
  } catch (error) {
    if (error.code === 11000) {
      res.status(403).json({
        status: false,
        msg: "This user name already exists. Duplicate User name don't allowed!",
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (validity) {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).json({ status: true, data: { user, token } });
      } else {
        res.status(400).json({ status: false, msg: 'Wrong Password!' });
      }
    } else {
      res.status(404).json({ status: false, msg: 'User does not exists!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
