import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

import roleRoute from "./routes/RoleRoute.js";
import userRoute from "./routes/UserRoute.js";
import productRoute from "./routes/ProductRoute.js";
import inventoryTransactionRoute from "./routes/InventoryTransactionRoute.js";
import customerRoute from "./routes/CustomerRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import orderDetailRoute from "./routes/OrderDetailRoute.js";
import supplierRoute from "./routes/SupplierRoute.js";
import purchaseRoute from "./routes/PurchaseRoute.js";
import purchaseDetailRoute from "./routes/PurchaseDetailRoute.js";
import authRoute from "./routes/AuthRoute.js";

import seedCustomer from "./seeders/CustomerSeeder.js";
import seedInventoryTransaction from "./seeders/InventoryTransactionSeeder.js";
import seedOrder from "./seeders/OrderSeeder.js";
import seedOrderDetail from "./seeders/OrderDetailSeeder.js";
import seedProduct from "./seeders/ProductSeeder.js";
import seedPurchase from "./seeders/PurchaseSeeder.js";
import seedPurchaseDetail from "./seeders/PurchaseDetailSeeder.js";
import seedSupplier from "./seeders/SupplierSeeder.js";
import seedUser from "./seeders/UserSeeder.js";
import seedRole from "./seeders/RoleSeeder.js";


// Mengimpor library dan modul yang diperlukan
console.log('Memuat library dan modul yang diperlukan...');
dotenv.config(); // Mengonfigurasi dotenv untuk mengambil variabel lingkungan dari file .env

// Mengaktifkan sinkronisasi database dengan opsi { force: true } untuk menciptakan kembali tabel (gunakan dengan hati-hati, ini akan menghapus semua data yang ada)
console.log('Mengaktifkan sinkronisasi database...');
db.sync({ force: true }).then(() => {
    console.log('Tabel berhasil dibuat.'); // Menampilkan pesan jika tabel berhasil dibuat
}).catch(err => {
    console.error('Gagal membuat tabel:', err); // Menampilkan pesan kesalahan jika gagal membuat tabel
});

// Membuat instance Express
console.log('Membuat instance Express...');
const app = express();

// Mengonfigurasi SequelizeStore untuk menyimpan sesi di database
console.log('Mengonfigurasi SequelizeStore untuk menyimpan sesi...');
const sessionStore = SequelizeStore(session.Store);

// Membuat instance baru dari SequelizeStore
console.log('Membuat instance baru dari SequelizeStore...');
const store = new sessionStore({
    db: db // Menggunakan koneksi database yang telah dikonfigurasi
});

// Mengatur middleware sesi
console.log('Mengatur middleware sesi...');
app.use(session({
    secret: process.env.SESS_SECRET, // Menggunakan variabel lingkungan untuk rahasia sesi
    resave: false, // Jangan menyimpan sesi jika tidak diubah
    saveUninitialized: true, // Menyimpan sesi yang baru
    store: store, // Menggunakan SequelizeStore untuk menyimpan sesi
    cookie: {
        secure: 'auto' // Mengatur opsi keamanan cookie
    }
}));

// Mengaktifkan CORS dengan opsi
console.log('Mengaktifkan CORS...');
app.use(cors({
    credentials: true, // Menyertakan cookie dalam permintaan CORS
    origin: ['http://localhost:3000', 'http://localhost:5173'] // Mengizinkan permintaan dari asal ini
}));

// Menganalisis permintaan JSON yang masuk
console.log('Menganalisis permintaan JSON yang masuk...');
app.use(express.json());

// Mendaftarkan rute peran
console.log('Mendaftarkan rute peran...');
app.use(roleRoute);

// Mendaftarkan rute pengguna
console.log('Mendaftarkan rute pengguna...');
app.use(userRoute);

// Mendaftarkan rute produk
console.log('Mendaftarkan rute produk...');
app.use(productRoute);

// Mendaftarkan rute transaksi inventaris
console.log('Mendaftarkan rute transaksi inventaris...');
app.use(inventoryTransactionRoute);

// Mendaftarkan rute pelanggan
console.log('Mendaftarkan rute pelanggan...');
app.use(customerRoute);

// Mendaftarkan rute pesanan
console.log('Mendaftarkan rute pesanan...');
app.use(orderRoute);

// Mendaftarkan rute detail pesanan
console.log('Mendaftarkan rute detail pesanan...');
app.use(orderDetailRoute);

// Mendaftarkan rute pemasok
console.log('Mendaftarkan rute pemasok...');
app.use(supplierRoute);

// Mendaftarkan rute pembelian
console.log('Mendaftarkan rute pembelian...');
app.use(purchaseRoute);

// Mendaftarkan rute detail pembelian
console.log('Mendaftarkan rute detail pembelian...');
app.use(purchaseDetailRoute);

// Mendaftarkan rute otentikasi
console.log('Mendaftarkan rute otentikasi...');
app.use(authRoute);

// Define route handler for root route
console.log('Define route handler for root route...');
app.get('/', (req, res) => {
    res.send('Hello, world!'); // Send a response when accessing the root route
});

// Mengaktifkan sinkronisasi database dengan opsi { force: true } untuk menciptakan kembali tabel (gunakan dengan hati-hati, ini akan menghapus semua data yang ada)
console.log('Mengaktifkan sinkronisasi database...');
db.sync({ force: true }).then(async () => {
    try {
        console.log('Tabel berhasil dibuat.'); // Menampilkan pesan jika tabel berhasil dibuat

        // Panggil seeder dalam urutan yang benar
        console.log('Menjalankan seeder produk...');
        await seedProduct();

        console.log('Menjalankan seeder pelanggan...');
        await seedCustomer();

        console.log('Menjalankan seeder pemasok...');
        await seedSupplier();

        console.log('Menjalankan seeder transaksi inventaris...');
        await seedInventoryTransaction();

        console.log('Menjalankan seeder peran...');
        await seedRole();

        console.log('Menjalankan seeder pengguna...');
        await seedUser();

        console.log('Menjalankan seeder pembelian...');
        await seedPurchase();

        console.log('Menjalankan seeder pesanan...');
        await seedOrder();

        console.log('Menjalankan seeder detail pesanan...');
        await seedOrderDetail();

        console.log('Menjalankan seeder detail pembelian...');
        await seedPurchaseDetail();

        app.listen(process.env.APP_PORT, () => {
            console.log('Server up and running...');
        });
    } catch (error) {
        console.error('Gagal menjalankan seeder:', error);
    }
}).catch(err => {
    console.error('Gagal membuat tabel:', err); // Menampilkan pesan kesalahan jika gagal membuat tabel
});
