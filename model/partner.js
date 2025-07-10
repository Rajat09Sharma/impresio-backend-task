const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    portfolio: {
        type: [{
            url: {
                type: String,
                required: true
            },
            description: {
                type: String
            }
        }],
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    aadharNumber: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    styles: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    },
}, { timestamps: true });

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
