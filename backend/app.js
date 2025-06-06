const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const setupSocket = require('./socket');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONECTION_URL)
  .then(() => {
    console.log('MongoDB connected');

    const server = http.createServer(app);
    setupSocket(server);

    app.use('/api/users', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/competitions', competitionRoutes);
    app.use('/api/competitions', questionRoutes);
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
