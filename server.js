const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const employeeRoutes = require('./routes/employees');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));  // optional: you can remove if not serving local files
app.use(express.json());

app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));