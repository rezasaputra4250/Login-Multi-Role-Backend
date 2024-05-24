import faker from 'faker';
import PurchaseDetails from '../models/PurchaseDetailModel.js';

// Fungsi untuk membuat data palsu detail pembelian
const seedPurchaseDetail = async () => {
    const numRecords = 10; // Definisikan jumlah catatan yang ingin Anda buat di sini

    try {
        // Array untuk menyimpan data detail pembelian palsu
        const purchaseDetails = [];

        // Generate data palsu sebanyak numRecords
        for (let i = 0; i < numRecords; i++) {
            const purchaseDetail = {
                purchaseId: faker.random.number({ min: 1, max: 10 }), // Contoh ID pembelian dari 1 hingga 10
                productId: faker.random.number({ min: 1, max: 5 }), // Contoh ID produk dari 1 hingga 20
                quantity: faker.random.number({ min: 1, max: 10 }), // Contoh kuantitas antara 1 hingga 10
                price: faker.random.number({ min: 10, max: 1000 }) // Contoh harga antara 10 hingga 1000
            };
            purchaseDetails.push(purchaseDetail);
        }

        // Menambahkan data palsu ke dalam database
        await PurchaseDetails.bulkCreate(purchaseDetails);

        console.log(`${numRecords} data detail pembelian palsu berhasil dibuat.`);
    } catch (error) {
        console.error('Gagal membuat data detail pembelian palsu:', error);
    }
};

export default seedPurchaseDetail;
