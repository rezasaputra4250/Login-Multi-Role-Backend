dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
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

    try {
        // Panggil fungsi seedUsers dan seedRoles sebelum server dimulai
        console.log('Menjalankan Seeder Roles...');
        await seedRoles();
        console.log('Seeder Roles selesai.');
        console.log('Menjalankan Seeder Users...');
        await seedUsers();
        console.log('Seeder Users selesai.');

        app.listen(process.env.APP_PORT, () => {
            console.log(`Server up and running on port ${process.env.APP_PORT}`);
        });
    } catch (error) {
        console.error('Gagal menjalankan seeder:', error);
    }
}).catch(err => {
    console.error('Gagal membuat tabel:', err);
});
