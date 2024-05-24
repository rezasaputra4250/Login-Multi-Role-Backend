import faker from 'faker'; // Import library faker
import Customer from "../models/CustomerModel.js"; // Mengimpor model peran (customer) dari file customerModel.js

// Fungsi untuk menambahkan data peran ke dalam database
const seedCustomers = async () => {
  try {
    // Array of customer data
    const customers = [];

    // Generate fake customer data
    for (let i = 0; i < 15; i++) {
      customers.push({
        customerName: faker.name.findName(),
        customerEmail: faker.internet.email(),
        customerPhone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Menambahkan data customer ke dalam database
    await Customer.bulkCreate(customers);

    console.log("Seeder untuk customer berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk customer gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};

export default seedCustomers;
