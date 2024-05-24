import faker from 'faker'; // Import library faker
import Product from "../models/ProductModel.js"; // Mengimpor model produk dari file ProductModel.js

// Fungsi untuk menambahkan data produk ke dalam database
const seedProducts = async () => {
  try {
    // Array of product data
    const products = [];

    // Generate fake product data
    for (let i = 0; i < 10; i++) {
      products.push({
        productName: faker.commerce.productName(),
        productDescription: faker.lorem.sentence(),
        productPrice: faker.datatype.number({ min: 10, max: 1000 }),
        productStock: faker.datatype.number({ min: 1, max: 1000 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Menambahkan data produk ke dalam database
    await Product.bulkCreate(products);

    console.log("Seeder untuk produk berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk produk gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};

export default seedProducts;
