const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    physioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    amountPaid: { type: Number, required: false },
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
