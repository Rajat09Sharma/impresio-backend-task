
const Inquiry = require("../model/inquiry");
const Partner = require("../model/partner");
const User = require("../model/user");

// get kpis
async function getKpisHandler(req, res) {
    try {
        const totalClients = await User.countDocuments({ role: "client" });
        const totalPartners = await User.countDocuments({ role: "partner" });
        const pendingVerifications = await Partner.countDocuments({ status: "pending" });
        const totalInquiries = await Inquiry.countDocuments();

        return res.status(200).json({
            message: "Total number of clients, partners, pending verfications and inquiries are fetched successfully!",
            totalClients,
            totalPartners,
            pendingVerifications,
            totalInquiries
        });
    } catch (error) {
        console.error("Error fetching KPIs:", error);
        return res.status(500).json({ message: "Failed to fetch KPIs data." });
    }
};

module.exports = {
    getKpisHandler,
};
