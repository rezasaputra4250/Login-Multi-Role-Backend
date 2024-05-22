import argon2 from "argon2"; // Mengimpor modul argon2 untuk hashing password
import User from "../models/UserModel.js"; // Mengimpor model pengguna (User) dari file UserModel.js

// Fungsi untuk menambahkan data pengguna ke dalam database
const seedUsers = async () => {
  try {
    // Array of user data
    const users = [
      {
        name: "Zaelani",
        email: "zaelani@example.com",
        password: await argon2.hash("password"), // Menghash password menggunakan Argon2
        roleId: 1, // Ganti dengan roleId yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dewi Nur Hapidah",
        email: "dewinurhapidah@example.com",
        password: await argon2.hash("password"), // Menghash password menggunakan Argon2
        roleId: 1, // Ganti dengan roleId yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Reza Saputra",
        email: "rezasaputra@example.com",
        password: await argon2.hash("password"), // Menghash password menggunakan Argon2
        roleId: 2, // Ganti dengan roleId yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Roni Saputra",
        email: "ronisaputra@example.com",
        password: await argon2.hash("password"), // Menghash password menggunakan Argon2
        roleId: 2, // Ganti dengan roleId yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Muhammad Rendi Saputra",
        email: "muhammadrendisaputra@example.com",
        password: await argon2.hash("password"), // Menghash password menggunakan Argon2
        roleId: 2, // Ganti dengan roleId yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dela Rahma Saputri",
        email: "delrahmasaputri@example.com",
        password: await argon2.hash("password"), // Menghash password menggunakan Argon2
        roleId: 2, // Ganti dengan roleId yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Adinda Ristiara Saputri",
        email: "adindaristiarasaputri@example.com",
        password: await argon2.hash("password"), // Menghash password menggunakan Argon2
        roleId: 2, // Ganti dengan roleId yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Tambahkan data pengguna lainnya jika diperlukan
    ];

    // Menambahkan data pengguna ke dalam database
    await User.bulkCreate(users);

    console.log("Seeder untuk pengguna berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk pengguna gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};
// Menambahkan data peran ke dalam database

export default seedUsers;
