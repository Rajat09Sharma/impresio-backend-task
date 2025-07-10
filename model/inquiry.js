const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    city: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["new", "responded", "booked", "closed"],
        default: "new"
    },
    date: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    closedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner'
    }
}, { timestamps: true });


const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
