const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');

dotenv.config();

const ApiFn = async () => {
  const app = express();

  const PORT = process.env.PORT || 8800;

  app.use(cors());

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('🔔 Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB: ', error.message);
    });

  app.use('/images', express.static(path.join(__dirname, 'public/images')));

  //middleware
  app.use(express.json());
  app.use(morgan('common'));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
  app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
      return res.status(200).json('File uploaded successfully.');
    } catch (err) {
      console.log(err);
    }
  });

  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/posts', postRoute);
  app.use('/api/conversations', conversationRoute);
  app.use('/api/messages', messageRoute);

  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ALIVE',
      message: 'Server is running',
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server Now Running on: http://localhost:${PORT}`);
  });
};

module.exports = ApiFn;
