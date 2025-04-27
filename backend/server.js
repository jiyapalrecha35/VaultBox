const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const cors = require('cors');

app.use(cors({
  origin: 'https://vault-box-jiyapalrecha35s-projects.vercel.app',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/vault', require('./routes/vaultRoutes'));
const trustedContactRoutes = require('./routes/trustedContactRoutes');
app.use('/api/trusted-contact', trustedContactRoutes);

// Cron Job
const autoDeleteVaults = require('./cronJobs/autoDeleteVaults');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');

        autoDeleteVaults(); // 🛠️ Start auto delete job **after** MongoDB is connected

        // Ensure the app listens on the correct port
        const port = process.env.PORT || 5000; // Use Render's provided PORT or fallback to 5000
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
