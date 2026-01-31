require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// importing
const authRoutes = require('./routes/auth'); 
const appointmentRoutes = require('./routes/appointments');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes); 

//connecting database
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => {
        console.log("❌ DB Connection Error:");
        console.log(err.message);
    });
    
app.get('/', (req, res) => {
    res.send("Physio Server is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));