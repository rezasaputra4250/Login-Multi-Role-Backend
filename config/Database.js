import { Sequelize } from "sequelize";

// Mengimpor Sequelize untuk mengelola koneksi database
const db = new Sequelize('auth_db', 'root', '', {
    host: "localhost", // Host database MySQL
    dialect: "mysql" // Menggunakan MySQL sebagai dialek database
});

// Ekspor instance Sequelize untuk digunakan di berbagai bagian aplikasi

export default db;
