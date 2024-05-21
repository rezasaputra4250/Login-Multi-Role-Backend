import argon2 from "argon2"; // Mengimpor modul argon2 untuk hashing password
import User from "../models/UserModel.js"; // Mengimpor model pengguna (User) dari file UserModel.js

// Fungsi untuk menambahkan data pengguna ke dalam database
const seedUsers = async () => {
  try {
    // Array of user data
    const users = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: await argon2.hash("password1"), // Menghash password menggunakan Argon2
        roleId: 1, // Ganti dengan roleId yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: await argon2.hash("password2"), // Menghash password menggunakan Argon2
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

export default seedUsers;
