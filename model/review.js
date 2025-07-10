const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner"
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
