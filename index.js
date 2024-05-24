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
    origin: ['http://localhost:3000', 'http://localhost:5173']
}));

app.use(express.json());

// Routes
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

// Sync database and seeders
db.sync({ force: true }).then(async () => {
    try {
        console.log('Tabel berhasil dibuat.');

        // Run seeders in proper order
        await seedProduct();
        await seedCustomer();
        await seedSupplier();
        await seedInventoryTransaction();
        await seedRole();
        await seedUser();
        await seedPurchase();
        await seedOrder();
        await seedOrderDetail();
        await seedPurchaseDetail();

        app.listen(process.env.APP_PORT, () => {
            console.log('Server up and running...');
        });
    } catch (error) {
        console.error('Gagal menjalankan seeder:', error);
    }
}).catch(err => {
    console.error('Gagal membuat tabel:', err);
});
