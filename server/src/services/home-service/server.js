
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('../../config/db');
const bannerRoutes = require('./routes/bannerRoutes');
const highlightRoutes = require('./routes/highlightRoutes');

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());
app.use('/api/highlights', highlightRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'home-service',
    status: 'running',
  });
});

app.use('/api/banners', bannerRoutes);

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Home Service running at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Home Service startup failed:', error.message);
  process.exit(1);
});

