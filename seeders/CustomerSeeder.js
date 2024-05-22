import Customer from "../models/CustomerModel.js"; // Mengimpor model peran (customer) dari file customerModel.js

// Fungsi untuk menambahkan data peran ke dalam database
const seedCustomers = async () => {
  try {
    // Array of customer data
    const customers = [
      {
        customerName: "Rendy Mulia A N",
        customerEmail: "rendymuliaan@example.com",
        customerPhone: "+62 813-8242-9252",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Gosho rsedia Jasa Sanet",
        customerEmail: "goshorsediajasasanet@example.com",
        customerPhone: "+62 878-6041-8233",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Farel Bayu F",
        customerEmail: "farelbayuf@example.com",
        customerPhone: "+62 895-1610-5793",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Riyal Uci Alra",
        customerEmail: "riyalucialra@example.com",
        customerPhone: "+62 899-9041-308",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Alwan",
        customerEmail: "alwan@example.com",
        customerPhone: "+62 877-9693-3260",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Khanif Al Amin",
        customerEmail: "khanifalamin@example.com",
        customerPhone: "+62 812-7827-9056",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Alwan",
        customerEmail: "alwan2@example.com",
        customerPhone: "+62 858-8377-8795",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Dimas",
        customerEmail: "dimas@example.com",
        customerPhone: "+62 813-1644-7563",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Usep Daiawan",
        customerEmail: "usepdaiawan@example.com",
        customerPhone: "+62 811-1287-721",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Afandi",
        customerEmail: "afandi@example.com",
        customerPhone: "+62 816-1926-595",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Donna",
        customerEmail: "donna@example.com",
        customerPhone: "+62 813-1730-7692",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Gamal Shahid",
        customerEmail: "gamalshahid@example.com",
        customerPhone: "+62 857-5971-3050",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "PT UBK",
        customerEmail: "ptubk@example.com",
        customerPhone: "+62 896-6967-0559",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Rn",
        customerEmail: "rn@example.com",
        customerPhone: "+62 857-8261-0287",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerName: "Ary",
        customerEmail: "ary@example.com",
        customerPhone: "+62 821-2450-5617",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Menambahkan data customer ke dalam database
    await Customer.bulkCreate(customers);

    console.log("Seeder untuk customer berhasil dijalankan."); // Menampilkan pesan jika seeder berhasil dijalankan
  } catch (error) {
    console.error("Seeder untuk customer gagal dijalankan:", error); // Menampilkan pesan kesalahan jika seeder gagal dijalankan
  }
};

export default seedCustomers;

