const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/physio/:id', async (req, res) => {
    try {
        const ptId = req.params.id;
        console.log("PT Dashboard is requesting appointments for ID:", ptId);

        const appts = await Appointment.find({ physioId: ptId })
            .populate('patientId', 'name contactNumber age gender') 
            .sort({ createdAt: -1 }); // Show newest first

        console.log(`Found ${appts.length} appointments in database for this ID.`);
        
        res.json(appts);
    } catch (err) {
        console.error("Error in /physio/:id route:", err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/book', async (req, res) => {
    try {
        const { patientId, physioId, date, timeSlot, amountPaid } = req.body;
        const newAppt = new Appointment({ patientId, physioId, date, timeSlot, amountPaid });
        await newAppt.save();
        res.status(201).json({ msg: "Appointment booked successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;