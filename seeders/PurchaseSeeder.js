import faker from 'faker';
import Purchases from '../models/PurchaseModel.js';

// Definisi variabel numRecords
const numRecords = 10; // Misalnya, 10 adalah jumlah catatan yang ingin Anda buat

// Fungsi untuk menanamkan detail pembelian
const seedPurchaseDetail = async () => {
    try {
        // Array untuk menyimpan data pembelian palsu
        const purchases = [];

        // Generate data palsu sebanyak numRecords
        for (let i = 0; i < numRecords; i++) {
            const purchase = {
                supplierId: faker.random.number({ min: 1, max: 10 }), // Contoh ID pemasok dari 1 hingga 10
                purchaseDate: faker.date.past(), // Contoh tanggal pembelian yang berada di masa lampau
                totalAmount: faker.random.number({ min: 100, max: 1000 }) // Contoh total jumlah antara 100 hingga 1000
            };
            purchases.push(purchase);
        }

        // Menambahkan data palsu ke dalam database
        await Purchases.bulkCreate(purchases);

        console.log(`${numRecords} data pembelian palsu berhasil dibuat.`);
    } catch (error) {
        console.error('Gagal membuat data pembelian palsu:', error);
    }
};

export default seedPurchaseDetail;
