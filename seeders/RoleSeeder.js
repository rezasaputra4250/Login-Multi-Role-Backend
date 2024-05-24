import faker from 'faker'; // Import library faker
import Role from "../models/RoleModel.js"; // Mengimpor model peran (Role) dari file RoleModel.js

// Fungsi untuk menambahkan data peran ke dalam database
const seedRoles = async () => {
  try {
    // Array of role data
    const roles = [];

    // Generate fake role data
    for (let i = 0; i < 5; i++) {
      roles.push({
        roleName: faker.name.jobType(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Menambahkan data peran ke dalam database
    await Role.bulkCreate(roles);

    console.log("Seeder untuk peran berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk peran gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};

export default seedRoles;
