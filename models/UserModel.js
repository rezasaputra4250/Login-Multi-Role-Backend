import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Roles from "./RoleModel.js"; // Mengimpor model "Roles"

const { DataTypes } = Sequelize;

// Definisi model "Users" dengan atribut-atribut yang sesuai
const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "UUID tidak boleh kosong."
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Nama tidak boleh kosong."
            },
            len: {
                args: [3, 100],
                msg: "Nama harus terdiri dari 3 hingga 100 karakter."
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Email tidak boleh kosong."
            },
            isEmail: {
                msg: "Email tidak valid."
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Password tidak boleh kosong."
            }
        }
    },
    roleId: { // Nama kolom untuk ID peran
        type: DataTypes.INTEGER, // Menggunakan tipe data INTEGER untuk kunci asing
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Role ID tidak boleh kosong."
            }
        }
    }
}, {
    freezeTableName: true // Menetapkan nama tabel menjadi "users" tanpa mengubahnya
});

// Tambahkan hook beforeValidate
Users.beforeValidate((user, options) => {
    console.log("Memvalidasi data pengguna...");
});

// Tambahkan hook afterValidate
Users.afterValidate((user, options) => {
    console.log("Validasi data pengguna selesai.");
});

// Definisi relasi many-to-one antara Users dan Roles
Users.belongsTo(Roles, { foreignKey: 'roleId', targetKey: 'roleId', as: 'roles' }); // User memiliki satu Role

export default Users;
