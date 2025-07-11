const { model } = require("mongoose");
const Partner = require("../model/partner");


// create Partner
async function createPartnerHandler(req, res) {
    const { name, location, price, tags, portfolio, categories, aadharNumber } = req.body;

    const { id } = req.user;


    try {

        if (!name || !price || !location || !tags || !portfolio || !categories || !aadharNumber) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const partner = await Partner.create({ ...req.body, userId: id });

        return res.status(201).json({ message: "Partner created successfully!", partner });


    } catch (error) {
        console.log("Create partner handler error: ", error);
        return res.status(500).json({ message: "Failed to create partner." })
    }

}


// get all partner
async function getAllPartnerHandler(req, res) {

    try {

        const partners = await Partner.find();

        return res.status(200).json({ message: "Partners fetch successfully!", partners });

    } catch (error) {
        console.log("Get All partner handler error: ", error);
        return res.status(500).json({ message: "Failed to get partners." })
    }

}

// get pending status partners
async function getPendingStatusPartnersHandler(req, res) {

    try {

        const partners = await Partner.find({ status: "pending" }).sort({ createdAt: -1 });

        return res.status(200).json({ message: " Partners with pending status fetch successfully!", partners });

    } catch (error) {
        console.log("partners with pending status handler error: ", error);
        return res.status(500).json({ message: "Failed to get pending partners." })
    }
}

// update status with comment
async function updatePartnerStatusHandler(req, res) {
    const partnerId = req.params.id;
    const { status, comment } = req.body;
    try {
        if (!status || !comment) {
            return res.status(400).json({ message: "All fields required!" });
        }

        const partner = await Partner.findByIdAndUpdate({ _id: partnerId }, { status, comment });
        return res.status(200).json({ message: "Partner status updated successfully" });

    } catch (error) {
        console.log("update partner status handler error: ", error);
        return res.status(500).json({ message: "Failed to update partner status." })
    }
}


//add Portfolio
async function addPortfolioHandler(req, res) {

    const { id } = req.params;

    const { url } = req.body;

    try {

        if (!url) {
            return res.status(400).json({ message: "All fields required" })
        }

        const partner = await Partner.findById({ _id: id });

        const portfolio = [...partner.portfolio];
        const data = {
            url: req.body.url,
            description: req.body?.description || ""
        }
        portfolio.push(data);

        const updatePartner = await Partner.updateOne({ _id: partner._id }, { $set: { portfolio: portfolio } });
        return res.status(200).json({ message: "Partner portfolio added successfully", portfolio })

    } catch (error) {
        console.log("Add partner portfolio handler error: ", error);
        return res.status(500).json({ message: "Failed to add portfolio." })
    }

}

// edit portfolio
async function editPortfolioHandler(req, res) {

    const { id, index } = req.params;

    try {
        const partner = await Partner.findById({ _id: id });

        if (partner.portfolio.length == 0) {
            return res.status(400).json({ message: "No Portfolio found!" });
        }

        if (+index < 0 || +index >= partner.portfolio.length) {
            return res.status(400).json({ message: "Invalid portfolio index" });
        }


        const portfolio = [...partner.portfolio];
        const data = {
            url: req.body.url,
            description: req.body?.description
        }
        portfolio.splice(+index, 1, data);

        const updatePartner = await Partner.updateOne({ _id: partner._id }, { $set: { portfolio: portfolio } });
        return res.status(200).json({ message: "Partner portfolio updated successfully", portfolio })

    } catch (error) {
        console.log("Edit partner portfolio handler error: ", error);
        return res.status(500).json({ message: "Failed to edit portfolio." })
    }

}


// delete portfolio
async function deletePortfolioHandler(req, res) {

    const { id, index } = req.params;

    try {

        const partner = await Partner.findById({ _id: id });

        if (partner.portfolio.length == 0) {
            return res.status(400).json({ message: "No Portfolio found!" });
        }

        if (+index < 0 || +index >= partner.portfolio.length) {
            return res.status(400).json({ message: "Invalid portfolio index" });
        }

        const portfolio = [...partner.portfolio];
        portfolio.splice(+index, 1);

        const updatePartner = await Partner.updateOne({ _id: partner._id }, { $set: { portfolio: portfolio } });
        return res.status(200).json({ message: "Portfolio deleted successfully", portfolio })

    } catch (error) {
        console.log("Delete partner portfolio handler error: ", error);
        return res.status(500).json({ message: "Failed to delete portfolio." })
    }

}





module.exports = {
    createPartnerHandler,
    getAllPartnerHandler,
    getPendingStatusPartnersHandler,
    updatePartnerStatusHandler,
    addPortfolioHandler,
    editPortfolioHandler,
    deletePortfolioHandler,
}