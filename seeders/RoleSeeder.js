import Role from "../models/RoleModel.js"; // Mengimpor model peran (Role) dari file RoleModel.js

// Fungsi untuk menambahkan data peran ke dalam database
const seedRoles = async () => {
  try {
    // Array of role data
    const roles = [
      {
        roleName: "Admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: "User",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Tambahkan data peran lainnya jika diperlukan
    ];

    // Menambahkan data peran ke dalam database
    await Role.bulkCreate(roles);

    console.log("Seeder untuk peran berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk peran gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};

export default seedRoles;
