import Category from '../models/Category.js';
import Product from '../models/Product.js';

// CATEGORY: Create
export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: 'Error creating category', error: err.message });
    }
};

// PRODUCT: Create
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Error creating product', error: err.message });
    }
};

// PRODUCT: Get all (with category filter & search)
export const getProducts = async (req, res) => {
    try {
        const { category, search, prescription, excludeExpired } = req.query;
        const filter = {};

        // Convert category name to ObjectId from Category collection
        if (category) {
            const foundCategory = await Category.findOne({ name: { $regex: new RegExp(category, "i") }, });
            if (foundCategory) {
                filter.category = foundCategory._id;
            } else {
                return res.status(404).json({ message: "Category not found" });
            }
        }

        // Filter by search name
        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        // Filter by prescription requirement
        if (prescription === "true") filter.requiresPrescription = true;
        if (prescription === "false") filter.requiresPrescription = false;

        // Filter by expiry date
        if (excludeExpired === "true") {
            filter.expiryDate = { $gt: new Date() };
        }

        // Fetch products and populate category info
        const products = await Product.find(filter).populate("category");
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
};

// PRODUCT: Get single
export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
};

// PRODUCT: Update
export const updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

// PRODUCT: Delete
export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};

// Admin update product
export const updateProductByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: req.body }, // Updates only provided fields
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Failed to update product" });
    }
};
