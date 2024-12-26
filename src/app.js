require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const ebookRoutes = require('./routes/ebookRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/ebooks', ebookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
