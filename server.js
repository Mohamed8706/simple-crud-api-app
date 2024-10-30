const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));