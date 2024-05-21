import Customers from "../models/CustomerModel.js";


// Mendapatkan semua data pelanggan
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customers.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan data pelanggan berdasarkan ID
export const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customers.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat data pelanggan baru
export const createCustomer = async (req, res) => {
    const { customerName, customerEmail, customerPhone } = req.body;
    try {
        const newCustomer = await Customers.create({
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone
        });
        res.status(201).json({ message: "Customer created successfully", data: newCustomer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate data pelanggan berdasarkan ID
export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { customerName, customerEmail, customerPhone } = req.body;
    try {
        const customer = await Customers.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        await customer.update({
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone
        });
        res.status(200).json({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus data pelanggan berdasarkan ID
export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customers.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        await customer.destroy();
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
