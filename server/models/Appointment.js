const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET APPOINTMENTS FOR A SPECIFIC PHYSIOTHERAPIST
router.get('/physio/:id', async (req, res) => {
    try {
        const ptId = req.params.id;
        console.log("PT Dashboard is requesting appointments for ID:", ptId);

        // We search for appointments where physioId matches the ID from the URL
        const appts = await Appointment.find({ physioId: ptId })
            .populate('patientId', 'name contactNumber age gender') // This brings patient details
            .sort({ createdAt: -1 }); // Show newest first

        console.log(`Found ${appts.length} appointments in database for this ID.`);
        
        res.json(appts);
    } catch (err) {
        console.error("Error in /physio/:id route:", err);
        res.status(500).json({ error: err.message });
    }
});

// BOOK AN APPOINTMENT (Make sure this is here too)
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