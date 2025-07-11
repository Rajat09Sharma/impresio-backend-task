const Category = require("../model/category");


// create category
async function createCategoryHandler(req, res) {
    try {
        const category = await Category.create({ name: req.body.name });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Failed to create category", error });
    }
};

//get categories
async function getCategoriesHandler(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json({ message: "Categories fetch successfully", categories });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories", error });
    }
};


//update category
async function updateCategoryHandler(req, res) {
    const id = req.params.id
    try {
        const category = await Category.findByIdAndUpdate({ _id: id }, { name: req.body.name }, { new: true });
        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Failed to update category", error });
    }
};


// delete category
async function deleteCategoryHandler(req, res) {
    const id = req.params.id;
    try {
        const category = await Category.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Category deleted", category });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category", error });
    }
};

module.exports = {
    createCategoryHandler,
    getCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler
}