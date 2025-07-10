const { model } = require("mongoose");
const Partner = require("../model/partner");


// create Partner
async function createPartnerHandler(req, res) {
    const { name, location, price, tags, portfolio, categories, aadharNumber } = req.body;


    try {

        if (!name || !price || !location || !tags || !portfolio || !categories || !aadharNumber) {
            res.status(400).json({ message: "All fields are required!" });
        }

        const partner = await Partner.create({ ...req.body });

        res.status(201).json({ message: "Partner created successfully!", partner });


    } catch (error) {
        console.log("Create partner handler error: ", error);
        res.status(500).json({ message: "Failed to create partner." })
    }

}


// get all partner
async function getAllPartnerHandler(req, res) {

    try {

        const partners = await Partner.find();

        res.status(200).json({ message: "Partners fetch successfully!", partners });

    } catch (error) {
        console.log("Get All partner handler error: ", error);
        res.status(500).json({ message: "Failed to get partners." })
    }

}


//add Portfolio

async function addPortfolioHandler(req, res) {

    const { id } = req.params;

    const { url } = req.body;

    try {

        if (!url) {
            res.status(400).json({ message: "All fields required" })
        }

        const partner = await Partner.findById({ _id: id });

        const portfolio = [...partner.portfolio];
        const data = {
            url: req.body.url,
            description: req.body?.description
        }
        portfolio.push(data);

        const updatePartner = await Partner.updateOne({ _id: partner._id }, { $set: { portfolio: portfolio } });
        res.status(200).json({ message: "Partner portfolio added successfully", portfolio })

    } catch (error) {
        console.log("Add partner portfolio handler error: ", error);
        res.status(500).json({ message: "Failed to add portfolio." })
    }

}

// edit portfolio
async function editPortfolioHandler(req, res) {

    const { id, index } = req.params;

    try {
        const partner = await Partner.findById({ _id: id });

        if (partner.portfolio.length == 0) {
            res.status(400).json({ message: "No Portfolio found!" });
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
        res.status(200).json({ message: "Partner portfolio updated successfully", portfolio })

    } catch (error) {
        console.log("Edit partner portfolio handler error: ", error);
        res.status(500).json({ message: "Failed to edit portfolio." })
    }

}


// delete portfolio
async function deletePortfolioHandler(req, res) {

    const { id, index } = req.params;

    try {

        const partner = await Partner.findById({ _id: id });

        if (partner.portfolio.length == 0) {
            res.status(400).json({ message: "No Portfolio found!" });
        }

        if (+index < 0 || +index >= partner.portfolio.length) {
            return res.status(400).json({ message: "Invalid portfolio index" });
        }

        const portfolio = [...partner.portfolio];
        portfolio.splice(+index, 1);

        const updatePartner = await Partner.updateOne({ _id: partner._id }, { $set: { portfolio: portfolio } });
        res.status(200).json({ message: "Portfolio deleted successfully", portfolio })

    } catch (error) {
        console.log("Delete partner portfolio handler error: ", error);
        res.status(500).json({ message: "Failed to delete portfolio." })
    }

}

//fetch matched inquiries or lead fetching
async function getLeadsHandler(req, res) {

    try {

    } catch (error) {
        console.log("Delete partner portfolio handler error: ", error);
        res.status(500).json({ message: "Failed to delete portfolio." })
    }

}



module.exports = {
    createPartnerHandler,
    getAllPartnerHandler,
    addPortfolioHandler,
    editPortfolioHandler,
    deletePortfolioHandler,
}