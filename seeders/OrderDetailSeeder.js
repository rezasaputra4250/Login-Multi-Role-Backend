import OrderDetails from "../models/OrderDetailModel.js"; // Mengimpor model OrderDetails dari file OrderDetailsModel.js
import faker from 'faker'; // Mengimpor modul faker untuk data palsu

// Fungsi untuk menambahkan data detail pesanan ke dalam database menggunakan Faker
const seedOrderDetails = async () => {
  try {
    // Array of dummy order detail data
    const orderDetails = Array.from({ length: 10 }, () => ({
      orderId: faker.datatype.number({ min: 1, max: 10 }), // Menghasilkan orderId acak antara 1 dan 10
      productId: faker.datatype.number({ min: 1, max: 10 }), // Menghasilkan productId acak antara 1 dan 10
      quantity: faker.datatype.number({ min: 1, max: 10 }), // Menghasilkan jumlah acak antara 1 dan 10
      price: faker.datatype.number({ min: 10, max: 1000, precision: 0.01 }) // Menghasilkan harga acak antara 10 dan 1000
    }));

    // Menambahkan data detail pesanan palsu ke dalam database
    await OrderDetails.bulkCreate(orderDetails);

    console.log("Seeder untuk detail pesanan berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk detail pesanan gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};

export default seedOrderDetails;
