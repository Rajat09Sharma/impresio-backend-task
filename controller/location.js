const Location = require("../model/location");


// create location
async function createLocationHandler(req, res) {
    try {
        const location = await Location.create({ name: req.body.name });
        return res.status(201).json({ message: "Loaction created successfully", location });
    } catch (error) {
        return res.status(500).json({ message: "Failed to create location", error });
    }
};

// get location
async function getLocationsHandler(req, res) {
    try {
        const locations = await Location.find();
        return res.status(200).json({ message: "Locations fetch successfully", locations });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch locations", error });
    }
};


// updated location
async function updateLocationHandler(req, res) {
    const id = req.params.id;
    try {
        const location = await Location.findByIdAndUpdate({ _id: id }, { name: req.body.name }, { new: true });
        return res.status(200).json({ message: "Location updated successfully", location });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update location", error });
    }
};


//delete location
async function deleteLocationHandler(req, res) {
    const id = req.params.id;
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Location deleted", location });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete location", error });
    }
};

module.exports = {
    createLocationHandler,
    getLocationsHandler,
    updateLocationHandler,
    deleteLocationHandler
}
