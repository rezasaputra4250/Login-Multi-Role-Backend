import Products from "../models/ProductModel.js";

// Mendapatkan semua produk
export const getProducts = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan produk berdasarkan ID
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat produk baru
export const createProduct = async (req, res) => {
    const { productName, productDescription, productPrice, productStock } = req.body;
    try {
        const newProduct = await Products.create({
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productStock: productStock
        });
        res.status(201).json({ message: "Product created successfully", data: newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate produk berdasarkan ID
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, productDescription, productPrice, productStock } = req.body;
    try {
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.update({
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productStock: productStock
        });
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus produk berdasarkan ID
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
