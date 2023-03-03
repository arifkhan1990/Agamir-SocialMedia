import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import AuthRoute from './routes/authRoute.js';
import UserRoute from './routes/userRoute.js';
import PostRoute from './routes/postRoute.js';
import UploadRoute from './routes/uploadRoute.js';

const app = express();

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(cors());
dotenv.config();

// middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Server start and db connect
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(4000, () =>
      console.log('Server has started on app.listen port http://localhost:4000')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

// routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
