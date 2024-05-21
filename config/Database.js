import {Sequelize} from "sequelize";

// Mengimpor Sequelize untuk mengelola koneksi database
const db = new Sequelize('auth_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;