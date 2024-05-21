import OrderDetails from "../models/OrderDetailModel.js";

// Mendapatkan semua detail pesanan
export const getOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findAll();
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan detail pesanan berdasarkan ID
export const getOrderDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const orderDetail = await OrderDetails.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ message: "Order detail not found" });
        }
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat detail pesanan baru
export const createOrderDetail = async (req, res) => {
    const { orderId, productId, quantity, price } = req.body;
    try {
        const newOrderDetail = await OrderDetails.create({
            orderId: orderId,
            productId: productId,
            quantity: quantity,
            price: price
        });
        res.status(201).json({ message: "Order detail created successfully", data: newOrderDetail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate detail pesanan berdasarkan ID
export const updateOrderDetail = async (req, res) => {
    const { id } = req.params;
    const { orderId, productId, quantity, price } = req.body;
    try {
        const orderDetail = await OrderDetails.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ message: "Order detail not found" });
        }
        await orderDetail.update({
            orderId: orderId,
            productId: productId,
            quantity: quantity,
            price: price
        });
        res.status(200).json({ message: "Order detail updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus detail pesanan berdasarkan ID
export const deleteOrderDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const orderDetail = await OrderDetails.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ message: "Order detail not found" });
        }
        await orderDetail.destroy();
        res.status(200).json({ message: "Order detail deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
