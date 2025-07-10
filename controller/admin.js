const User = require("../models/User");
const Partner = require("../models/Partner");
const Inquiry = require("../models/Inquiry"); // Assuming you have an Inquiry model

// get kpis
async function getKpisHandler(req, res) {
    try {
        const totalClients = await User.countDocuments({ role: "client" });
        const totalPartners = await User.countDocuments({ role: "partner" });
        const pendingVerifications = await Partner.countDocuments({ status: "pending" });
        const totalInquiries = await Inquiry.countDocuments();

        res.status(200).json({
            message: "Total number of clients, partners, pending verfications and inquiries are fetched successfully!",
            totalClients,
            totalPartners,
            pendingVerifications,
            totalInquiries
        });
    } catch (error) {
        console.error("Error fetching KPIs:", error);
        res.status(500).json({ message: "Failed to fetch KPIs data." });
    }
};

//

module.exports = {
    getKpisHandler,
};
