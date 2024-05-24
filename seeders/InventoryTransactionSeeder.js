import InventoryTransactions from "../models/InventoryTransactionModel.js"; // Mengimpor model InventoryTransactions dari file InventoryTransactionsModel.js
import faker from 'faker'; // Mengimpor modul faker untuk data palsu

// Fungsi untuk menambahkan data transaksi inventaris ke dalam database menggunakan Faker
const seedInventoryTransactions = async () => {
  try {
    // Array of dummy inventory transaction data
    const inventoryTransactions = Array.from({ length: 10 }, () => ({
      productId: faker.datatype.number({ min: 1, max: 10 }), // Menghasilkan productId acak antara 1 dan 10
      transactionDate: faker.date.past(), // Menghasilkan tanggal transaksi acak di masa lalu
      quantity: faker.datatype.number({ min: 1, max: 100 }), // Menghasilkan jumlah acak antara 1 dan 100
      transactionType: faker.random.arrayElement(['IN', 'OUT']) // Memilih jenis transaksi acak dari 'IN' atau 'OUT'
    }));

    // Menambahkan data transaksi inventaris palsu ke dalam database
    await InventoryTransactions.bulkCreate(inventoryTransactions);

    console.log("Seeder untuk transaksi inventaris berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk transaksi inventaris gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};

export default seedInventoryTransactions;
