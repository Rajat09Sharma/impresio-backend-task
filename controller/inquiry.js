const Inquiry = require("../model/inquiry");
const Partner = require("../model/partner");


// create inquiry
async function createInquiryHandler(req, res) {

    const { category, budget, city, date } = req.body;

    const { id, name } = req.user // when you will add auth midleware then updated them

    try {

        if (!category || !budget || !city || !date) {
            res.status(400).json({ message: "All fields required!" });
        }

        const result = await Inquiry.create({ ...req.body, name: name, userId: id });

        res.status(200).json({ message: "Inquiry created successfully.", inquiry: result });


    } catch (error) {
        console.log("Create inquiry handler error: ", error);
        res.status(500).json({ message: "Failed to create inquiry." })
    }

}

//fetch matched inquiries or lead fetching
async function getLeadsHandler(req, res) {
    const id = req.user.id;

    try {
        const partner = await Partner.findOne({ userId: id });

        const { location, price, categories } = partner;

        let matchInquiries = await Inquiry.find({
            budget: { $gte: price },
            category: { $in: categories },
            status: { $ne: "closed" }
        });

        matchInquiries = matchInquiries.filter(d => d.city.toLowerCase().trim() === location.toLowerCase().trim());

        res.status(200).json({ leads: matchInquiries });

    } catch (error) {
        console.error("Get leads handler error:", error);
        res.status(500).json({ message: "Failed to fetch leads." });
    }
}

//update inquiry status
async function updateInquiryStatusHandler(req, res) {
    const { id } = req.params;
    const partnerId = req.user.id;
    const { status } = req.body;

    try {
        const inquiry = await Inquiry.findById(id);

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        if (["booked", "closed"].includes(inquiry.status)) {
            return res.status(400).json({ message: "Inquiry already finalized." });
        }

        inquiry.status = status;

        if (status === "booked" || status === "closed") {
            inquiry.closedBy = partnerId;
        }

        await inquiry.save();

        res.status(200).json({
            message: "Inquiry status updated successfully",
            inquiry
        });

    } catch (error) {
        console.error("update inquiry status handler error:", error);
        res.status(500).json({ message: "Failed to update inquiry status." });
    }
}




module.exports = {
    createInquiryHandler,
    getLeadsHandler,
    updateInquiryStatusHandler
}
