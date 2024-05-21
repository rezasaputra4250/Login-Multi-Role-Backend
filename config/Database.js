import { Sequelize } from "sequelize";

<<<<<<< Updated upstream
=======
// Mengimpor Sequelize untuk mengelola koneksi database

// Membuat instance Sequelize untuk menghubungkan ke database MySQL
>>>>>>> Stashed changes
const db = new Sequelize('auth_db', 'root', '', {
    host: "localhost", // Host database MySQL
    dialect: "mysql" // Menggunakan MySQL sebagai dialek database
});

// Ekspor instance Sequelize untuk digunakan di berbagai bagian aplikasi

export default db;
