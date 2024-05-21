import InventoryTransactions from "../models/InventoryTransactionModel.js";


// Mendapatkan semua transaksi inventaris
export const getInventoryTransactions = async (req, res) => {
    try {
        const transactions = await InventoryTransactions.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan transaksi inventaris berdasarkan ID
export const getInventoryTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await InventoryTransactions.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: "Inventory transaction not found" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat transaksi inventaris baru
export const createInventoryTransaction = async (req, res) => {
    const { productId, transactionDate, quantity, transactionType } = req.body;
    try {
        const newTransaction = await InventoryTransactions.create({
            productId: productId,
            transactionDate: transactionDate,
            quantity: quantity,
            transactionType: transactionType
        });
        res.status(201).json({ message: "Inventory transaction created successfully", data: newTransaction });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate transaksi inventaris berdasarkan ID
export const updateInventoryTransaction = async (req, res) => {
    const { id } = req.params;
    const { productId, transactionDate, quantity, transactionType } = req.body;
    try {
        const transaction = await InventoryTransactions.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: "Inventory transaction not found" });
        }
        await transaction.update({
            productId: productId,
            transactionDate: transactionDate,
            quantity: quantity,
            transactionType: transactionType
        });
        res.status(200).json({ message: "Inventory transaction updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus transaksi inventaris berdasarkan ID
export const deleteInventoryTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await InventoryTransactions.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: "Inventory transaction not found" });
        }
        await transaction.destroy();
        res.status(200).json({ message: "Inventory transaction deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
