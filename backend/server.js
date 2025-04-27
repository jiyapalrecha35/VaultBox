const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
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

        // Use '0.0.0.0' to ensure the server listens on all interfaces
        app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => console.log(err));
