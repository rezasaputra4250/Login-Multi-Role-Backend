import express from "express"; // Mengimpor framework Express untuk membuat server HTTP
import cors from "cors"; // Mengimpor middleware Cors untuk mengaktifkan CORS (Cross-Origin Resource Sharing)
import session from "express-session"; // Mengimpor middleware express-session untuk manajemen sesi
import dotenv from "dotenv"; // Mengimpor dotenv untuk mengelola variabel lingkungan
import db from "./config/Database.js"; // Mengimpor koneksi database dari modul konfigurasi
import SequelizeStore from "connect-session-sequelize"; // Mengimpor SequelizeStore untuk menyimpan sesi dalam database
import roleRoute from "./routes/RoleRoute.js"; // Menambahkan rute untuk peran
import userRoute from "./routes/UserRoute.js"; // Menambahkan rute untuk pengguna
import productRoute from "./routes/ProductRoute.js"; // Menambahkan rute untuk produk
import inventoryTransactionRoute from "./routes/InventoryTransactionRoute.js"; // Menambahkan rute untuk transaksi inventaris
import customerRoute from "./routes/CustomerRoute.js"; // Menambahkan rute untuk pelanggan
import orderRoute from "./routes/OrderRoute.js"; // Menambahkan rute untuk pesanan
import orderDetailRoute from "./routes/OrderDetailRoute.js"; // Menambahkan rute untuk detail pesanan
import supplierRoute from "./routes/SupplierRoute.js"; // Menambahkan rute untuk pemasok
import purchaseRoute from "./routes/PurchaseRoute.js"; // Menambahkan rute untuk pembelian
import purchaseDetailRoute from "./routes/PurchaseDetailRoute.js"; // Menambahkan rute untuk detail pembelian
import authRoute from "./routes/AuthRoute.js"; // Menambahkan rute untuk otentikasi

// Mengimpor library dan modul yang diperlukan
dotenv.config(); // Mengonfigurasi dotenv untuk mengambil variabel lingkungan dari file .env

// Mengaktifkan sinkronisasi database dengan opsi { force: true } untuk menciptakan kembali tabel (gunakan dengan hati-hati, ini akan menghapus semua data yang ada)
db.sync({ force: true }).then(() => {
    console.log('Tabel berhasil dibuat.'); // Menampilkan pesan jika tabel berhasil dibuat
}).catch(err => {
    console.error('Gagal membuat tabel:', err); // Menampilkan pesan kesalahan jika gagal membuat tabel
});

// Membuat instance Express
const app = express();

// Mengonfigurasi SequelizeStore untuk menyimpan sesi di database
const sessionStore = SequelizeStore(session.Store);

// Membuat instance baru dari SequelizeStore
const store = new sessionStore({
    db: db // Menggunakan koneksi database yang telah dikonfigurasi
});

// Mengatur middleware sesi
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
app.use(cors({
    credentials: true, // Menyertakan cookie dalam permintaan CORS
    origin: 'http://localhost:3000' // Mengizinkan permintaan dari asal ini
}));

app.use(express.json());
app.use(roleRoute);
app.use(userRoute);
app.use(productRoute);
app.use(inventoryTransactionRoute);
app.use(customerRoute);
app.use(orderRoute);
app.use(orderDetailRoute);
app.use(supplierRoute);
app.use(purchaseRoute);
app.use(purchaseDetailRoute);
app.use(authRoute);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

db.sync({ force: true }).then(async () => {
    console.log('Tabel berhasil dibuat.');
    
    // Panggil kedua seeder sebelum server dimulai
    await seedRoles();
    await seedUsers();

    app.listen(process.env.APP_PORT, () => {
        console.log('Server up and running...');
    });
}).catch(err => {
    console.error('Gagal membuat tabel:', err);
});
