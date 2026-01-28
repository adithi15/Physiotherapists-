const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User"); 

//  for BOOKING 
router.post("/book", async (req, res) => {
  try {
    const { patientId, physioId, date, timeSlot, amountPaid } = req.body;
    const existingAppointment = await Appointment.findOne({
      physioId,
      date,
      timeSlot,
    });
    if (existingAppointment) {
      return res.status(400).json({ msg: "This slot is already booked." });
    }
    const newAppt = new Appointment({
      patientId,
      physioId,
      date,
      timeSlot,
      amountPaid,
    });
    await newAppt.save();
    res.status(201).json({ msg: "Appointment booked successfully!" });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/physio/:id", async (req, res) => {
  try {
    const appts = await Appointment.find({ physioId: req.params.id })
      .populate("patientId", "name contactNumber age gender")
      .sort({ timeSlot: 1 });

    res.json(appts);
  } catch (err) {
    console.error("Fetch PT Appts Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const appts = await Appointment.find({ patientId: req.params.id }).populate(
      "physioId",
      "name specialization",
    );
    res.json(appts);
  } catch (err) {
    console.error("Fetch Patient Appts Error:", err);
    res.status(500).json({ error: err.message });
  }
});
