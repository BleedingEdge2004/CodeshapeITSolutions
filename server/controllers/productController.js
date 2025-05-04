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
    const { search, category } = req.query;
    const filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category) filter.category = category;

    const products = await Product.find(filter).populate('category');
    res.json(products);
};

// PRODUCT: Get single
export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
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
