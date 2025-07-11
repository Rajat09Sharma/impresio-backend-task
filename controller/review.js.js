const Review = require("../model/review");

// create review
async function createReviewHandler(req, res) {
    const { rating, comment } = req.body;
    const { id } = req.user.id
    const partnerId = req.params.id

    try {
        if (!rating) {
            return res.status(400).json({ message: "Rating is Required!" });
        }

        const review = await Review.create({ ...req.body, userId: id, partnerId });
        return res.status(201).json({ message: "Review created successfully!", review })


    } catch (error) {
        console.error("Error fetching KPIs:", error);
        return res.status(500).json({ message: "Failed to fetch KPIs data." });
    }
}

//get reviews
async function getReviewsHandler(req, res) {
    try {
        const reviews = await Review.find();
        if (reviews) {
            return res.status(201).json({ message: "Fetch Reviews successfully!", reviews })
        } else {
            return res.status(400).json({ message: "No reviews!" })
        }

    } catch (error) {
        console.error("get Reviews Handler Error:", error);
        return res.status(500).json({ message: "Failed to fetch reviews." });
    }
}

//get review by ID
async function getReviewByIdHandler(req, res) {
    const partnerId = req.params.id;
    try {
        const review = await Review.findOne({ partnerId });
        if (review) {
            return res.status(201).json({ message: "Fetch Reviews successfully!", review })
        } else {
            return res.status(400).json({ message: "No reviews!" })
        }

    } catch (error) {
        console.error("get Review ById Handler Error:", error);
        return res.status(500).json({ message: "Failed to fetch reviews." });


    }
}


//update review
async function updateReviewHandler(req, res) {
    const { rating, comment } = req.body;
    const reviewId = req.params.id

    try {
        if (!rating) {
            return res.status(400).json({ message: "Rating is Required!" });
        }

        const review = await Review.findOneAndUpdate({ _id: reviewId }, { ...req.body })
        return res.status(201).json({ message: "Review updated successfully!", review })


    } catch (error) {
        console.error("update Review Handler Error:", error);
        return res.status(500).json({ message: "Failed to update review." });
    }
}

//delete review
async function deleteReviewHandler(req, res) {
    const reviewId = req.params.id

    try {

        const review = await Review.deleteOne({ _id: reviewId })
        return res.status(201).json({ message: "Review deleted successfully!", review })


    } catch (error) {
        console.error("delete Review Handler Error:", error);
        return res.status(500).json({ message: "Failed to delete review." });
    }
}

module.exports = {
    createReviewHandler,
    getReviewsHandler,
    getReviewByIdHandler,
    updateReviewHandler,
    deleteReviewHandler
}