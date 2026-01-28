const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    role: { type: String, enum: ['patient', 'physiotherapist'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    
    // Patient Specific Fields
    age: { type: Number },
    gender: { type: String },

    // Physiotherapist Specific Fields
    qualification: { type: String },
    specialization: { type: String },
    clinicAddress: { type: String },
    fees: { type: Number },
    
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);