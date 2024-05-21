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

// Menganalisis permintaan JSON yang masuk
app.use(express.json());

// Mendaftarkan rute peran
app.use(roleRoute);

// Mendaftarkan rute pengguna
app.use(userRoute);

// Mendaftarkan rute produk
app.use(productRoute);

// Mendaftarkan rute transaksi inventaris
app.use(inventoryTransactionRoute);

// Mendaftarkan rute pelanggan
app.use(customerRoute);

// Mendaftarkan rute pesanan
app.use(orderRoute);

// Mendaftarkan rute detail pesanan
app.use(orderDetailRoute);

// Mendaftarkan rute pemasok
app.use(supplierRoute);

// Mendaftarkan rute pembelian
app.use(purchaseRoute);

// Mendaftarkan rute detail pembelian
app.use(purchaseDetailRoute);

// Mendaftarkan rute otentikasi
app.use(authRoute);

// Define route handler for root route
app.get('/', (req, res) => {
    res.send('Hello, world!'); // Send a response when accessing the root route
});

// Memulai server dan mendengarkan pada port yang ditentukan
app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
