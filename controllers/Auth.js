import User from "../models/UserModel.js"; // Mengimpor model pengguna (user)
import argon2 from "argon2"; // Mengimpor modul argon2 untuk hashing dan verifikasi password

// Fungsi untuk menangani permintaan registrasi pengguna
export const Register = async (req, res) => {
    try {
        // Ekstrak data yang diperlukan dari body permintaan
        const { name, email, password, roleId } = req.body;

        // Cek apakah email sudah digunakan oleh pengguna lain
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "Email sudah digunakan oleh pengguna lain" });
        }

        // Hash password sebelum disimpan ke database
        const hashedPassword = await argon2.hash(password);

        // Buat pengguna baru dalam database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId
        });

        // Kirim respons sukses
        res.status(201).json({ msg: "Registrasi berhasil", userId: newUser.uuid });
    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error("Error during registration:", error);
        res.status(500).json({ msg: "Registrasi gagal, silakan coba lagi" });
    }
};
// Fungsi untuk menangani permintaan login pengguna
export const Login = async (req, res) =>{
    // Mencari pengguna berdasarkan alamat email yang diberikan dalam body permintaan
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    // Jika pengguna tidak ditemukan, kembalikan respons dengan status 404 dan pesan "User tidak ditemukan"
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    // Memverifikasi password yang diberikan dengan hash password yang disimpan dalam database
    const match = await argon2.verify(user.password, req.body.password);
    // Jika password tidak sesuai, kembalikan respons dengan status 400 dan pesan "Wrong Password"
    if(!match) return res.status(400).json({msg: "Wrong Password"});

    // Menyimpan UUID pengguna dalam sesi untuk menandai bahwa pengguna telah login
    req.session.userId = user.uuid;

    // Mengambil beberapa informasi pengguna untuk disertakan dalam respons
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const roleId = user.roleId; // Mengambil roleId dari pengguna

    // Mengirim respons dengan status 200 dan informasi pengguna yang berhasil login
    res.status(200).json({uuid, name, email, roleId});
}

// Fungsi untuk mendapatkan informasi pengguna yang sedang login (me)
export const Me = async (req, res) =>{
    // Memeriksa apakah ada ID pengguna yang disimpan dalam sesi
    if(!req.session.userId){
        // Jika tidak, kembalikan respons dengan status 401 dan pesan "Mohon login ke akun Anda!"
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }

    // Mencari pengguna berdasarkan UUID yang disimpan dalam sesi
    const user = await User.findOne({
        attributes:['uuid','name','email','roleId'], // Memilih atribut yang akan disertakan dalam respons
        where: {
            uuid: req.session.userId
        }
    });
    // Jika pengguna tidak ditemukan, kembalikan respons dengan status 404 dan pesan "User tidak ditemukan"
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    // Mengirim respons dengan status 200 dan informasi pengguna yang berhasil ditemukan
    res.status(200).json(user);
}

// Fungsi untuk logout pengguna dengan menghapus sesi
export const logOut = (req, res) =>{
    // Menghapus sesi pengguna
    req.session.destroy((err)=>{
        // Jika terjadi kesalahan saat menghapus sesi, kembalikan respons dengan status 400 dan pesan "Tidak dapat logout"
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        // Jika berhasil logout, kembalikan respons dengan status 200 dan pesan "Anda telah logout"
        res.status(200).json({msg: "Anda telah logout"});
    });
}
