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
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    roleId: { // Nama kolom untuk ID peran
        type: DataTypes.INTEGER, // Menggunakan tipe data INTEGER untuk kunci asing
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true // Menetapkan nama tabel menjadi "users" tanpa mengubahnya
});

// Definisi relasi many-to-one antara Users dan Roles
Users.belongsTo(Roles, { foreignKey: 'roleId', targetKey: 'roleId', as: 'roles' }); // User memiliki satu Role

export default Users;
