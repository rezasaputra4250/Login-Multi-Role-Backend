import Suppliers from "../models/SupplierModel.js";

// Mendapatkan semua data supplier
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Suppliers.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan data supplier berdasarkan ID
export const getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Suppliers.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat data supplier baru
export const createSupplier = async (req, res) => {
    const { supplierName, supplierEmail, supplierPhone } = req.body;
    try {
        const newSupplier = await Suppliers.create({
            supplierName: supplierName,
            supplierEmail: supplierEmail,
            supplierPhone: supplierPhone
        });
        res.status(201).json({ message: "Supplier created successfully", data: newSupplier });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate data supplier berdasarkan ID
export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { supplierName, supplierEmail, supplierPhone } = req.body;
    try {
        const supplier = await Suppliers.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        await supplier.update({
            supplierName: supplierName,
            supplierEmail: supplierEmail,
            supplierPhone: supplierPhone
        });
        res.status(200).json({ message: "Supplier updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus data supplier berdasarkan ID
export const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Suppliers.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        await supplier.destroy();
        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
