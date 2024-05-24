import faker from 'faker'; // Import library faker
import Supplier from "../models/SupplierModel.js"; // Mengimpor model pemasok dari file SupplierModel.js

// Fungsi untuk menambahkan data pemasok ke dalam database
const seedSuppliers = async () => {
  try {
    // Array of supplier data
    const suppliers = [];

    // Generate fake supplier data
    for (let i = 0; i < 10; i++) {
      suppliers.push({
        supplierName: faker.company.companyName(),
        supplierEmail: faker.internet.email(),
        supplierPhone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Menambahkan data pemasok ke dalam database
    await Supplier.bulkCreate(suppliers);

    console.log("Seeder untuk pemasok berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk pemasok gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};

export default seedSuppliers;
