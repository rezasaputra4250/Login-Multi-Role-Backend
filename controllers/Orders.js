import Orders from "../models/OrderModel.js";

// Mendapatkan semua pesanan
export const getOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrdersWithCustomers = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            include: Customers // Include Customers model to join the data
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan pesanan berdasarkan ID
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Orders.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat pesanan baru
export const createOrder = async (req, res) => {
    const { customerId, orderDate, totalAmount } = req.body;
    try {
        const newOrder = await Orders.create({
            customerId: customerId,
            orderDate: orderDate,
            totalAmount: totalAmount
        });
        res.status(201).json({ message: "Order created successfully", data: newOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate pesanan berdasarkan ID
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { customerId, orderDate, totalAmount } = req.body;
    try {
        const order = await Orders.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.update({
            customerId: customerId,
            orderDate: orderDate,
            totalAmount: totalAmount
        });
        res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus pesanan berdasarkan ID
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Orders.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.destroy();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
