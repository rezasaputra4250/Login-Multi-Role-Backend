// Import modul faker
import faker from 'faker';
// Import model Orders
import Orders from '../models/OrderModel.js';

// Fungsi untuk membuat data palsu untuk tabel Orders
const seedOrder = async () => {
    try {
        // Array untuk menyimpan data pesanan palsu
        const orders = [];

        // Loop untuk membuat beberapa data pesanan palsu
        for (let i = 0; i < 10; i++) {
            const order = {
                customerId: faker.random.number({ min: 1, max: 10 }), // Ganti 10 dengan jumlah data customer yang tersedia
                orderDate: faker.date.past(),
                totalAmount: faker.random.number({ min: 100, max: 1000 }),
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Tambahkan data pesanan palsu ke dalam array orders
            orders.push(order);
        }

        // Menambahkan data pesanan palsu ke dalam tabel Orders
        await Orders.bulkCreate(orders);

        console.log("Seeder untuk Orders berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
    } catch (error) {
        console.error("Seeder untuk Orders gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
    }
};

export default seedOrder;
