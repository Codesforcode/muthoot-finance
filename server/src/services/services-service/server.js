require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('../../config/db');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
res.status(200).json({
success: true,
service: 'services-service',
status: 'running',
});
});

app.use('/api/services', serviceRoutes);

async function startServer() {
try {
await connectDB();


app.listen(PORT, () => {
  console.log(`Services Service running at http://localhost:${PORT}`);
});


} catch (error) {
console.error('Server startup failed:', error.message);
process.exit(1);
}
}

startServer();
