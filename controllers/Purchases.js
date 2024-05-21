import Purchases from "../models/PurchaseModel.js";

// Mendapatkan semua data pembelian
export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchases.findAll();
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan data pembelian berdasarkan ID
export const getPurchaseById = async (req, res) => {
    const { id } = req.params;
    try {
        const purchase = await Purchases.findByPk(id);
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat data pembelian baru
export const createPurchase = async (req, res) => {
    const { supplierId, purchaseDate, totalAmount } = req.body;
    try {
        const newPurchase = await Purchases.create({
            supplierId: supplierId,
            purchaseDate: purchaseDate,
            totalAmount: totalAmount
        });
        res.status(201).json({ message: "Purchase created successfully", data: newPurchase });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate data pembelian berdasarkan ID
export const updatePurchase = async (req, res) => {
    const { id } = req.params;
    const { supplierId, purchaseDate, totalAmount } = req.body;
    try {
        const purchase = await Purchases.findByPk(id);
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        await purchase.update({
            supplierId: supplierId,
            purchaseDate: purchaseDate,
            totalAmount: totalAmount
        });
        res.status(200).json({ message: "Purchase updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus data pembelian berdasarkan ID
export const deletePurchase = async (req, res) => {
    const { id } = req.params;
    try {
        const purchase = await Purchases.findByPk(id);
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        await purchase.destroy();
        res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
