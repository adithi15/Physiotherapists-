const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User'); // <--- THIS LINE IS CRITICAL

// 1. BOOK AN APPOINTMENT
router.post('/book', async (req, res) => {
    try {
        const { patientId, physioId, date, timeSlot, amountPaid } = req.body;
        const existingAppointment = await Appointment.findOne({ physioId, date, timeSlot });
        if (existingAppointment) {
            return res.status(400).json({ msg: "This slot is already booked." });
        }
        const newAppt = new Appointment({ patientId, physioId, date, timeSlot, amountPaid });
        await newAppt.save();
        res.status(201).json({ msg: "Appointment booked successfully!" });
    } catch (err) {
        console.error("Booking Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// 2. GET APPOINTMENTS FOR PHYSIOTHERAPIST
router.get('/physio/:id', async (req, res) => {
    try {
        // We find appointments for the PT and "populate" patient details
        const appts = await Appointment.find({ physioId: req.params.id })
            .populate('patientId', 'name contactNumber age gender') 
            .sort({ timeSlot: 1 });
        
        res.json(appts);
    } catch (err) {
        console.error("Fetch PT Appts Error:", err); // This will show why it crashed in VS Code
        res.status(500).json({ error: err.message });
    }
});

// 3. GET APPOINTMENTS FOR PATIENT
router.get('/user/:id', async (req, res) => {
    try {
        const appts = await Appointment.find({ patientId: req.params.id })
            .populate('physioId', 'name specialization');
        res.json(appts);
    } catch (err) {
        console.error("Fetch Patient Appts Error:", err);
        res.status(500).json({ error: err.message });
    }
});