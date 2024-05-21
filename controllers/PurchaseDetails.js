import PurchaseDetails from "../models/PurchaseDetailModel.js";

// Mendapatkan semua detail pembelian
export const getPurchaseDetails = async (req, res) => {
    try {
        const purchaseDetails = await PurchaseDetails.findAll();
        res.status(200).json(purchaseDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan detail pembelian berdasarkan ID
export const getPurchaseDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const purchaseDetail = await PurchaseDetails.findByPk(id);
        if (!purchaseDetail) {
            return res.status(404).json({ message: "Purchase detail not found" });
        }
        res.status(200).json(purchaseDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat detail pembelian baru
export const createPurchaseDetail = async (req, res) => {
    const { purchaseId, productId, quantity, price } = req.body;
    try {
        const newPurchaseDetail = await PurchaseDetails.create({
            purchaseId: purchaseId,
            productId: productId,
            quantity: quantity,
            price: price
        });
        res.status(201).json({ message: "Purchase detail created successfully", data: newPurchaseDetail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate detail pembelian berdasarkan ID
export const updatePurchaseDetail = async (req, res) => {
    const { id } = req.params;
    const { purchaseId, productId, quantity, price } = req.body;
    try {
        const purchaseDetail = await PurchaseDetails.findByPk(id);
        if (!purchaseDetail) {
            return res.status(404).json({ message: "Purchase detail not found" });
        }
        await purchaseDetail.update({
            purchaseId: purchaseId,
            productId: productId,
            quantity: quantity,
            price: price
        });
        res.status(200).json({ message: "Purchase detail updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus detail pembelian berdasarkan ID
export const deletePurchaseDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const purchaseDetail = await PurchaseDetails.findByPk(id);
        if (!purchaseDetail) {
            return res.status(404).json({ message: "Purchase detail not found" });
        }
        await purchaseDetail.destroy();
        res.status(200).json({ message: "Purchase detail deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
