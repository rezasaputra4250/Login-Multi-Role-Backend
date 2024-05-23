import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Register = async (req, res) => {
    try {
        const { name, email, password, roleId } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "Email sudah digunakan oleh pengguna lain" });
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId
        });

        console.log("Registrasi berhasil:", newUser.uuid); // Menampilkan ID pengguna yang baru dibuat
        res.status(201).json({ msg: "Registrasi berhasil", userId: newUser.uuid });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ msg: "Registrasi gagal, silakan coba lagi" });
    }
};

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Password salah"});

    req.session.userId = user.uuid;

    console.log("Login berhasil:", user.uuid); // Menampilkan ID pengguna yang berhasil login
    res.status(200).json({msg: "Login berhasil"});
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }

    const user = await User.findOne({
        attributes:['uuid','name','email','roleId'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    console.log("Informasi pengguna:", user); // Menampilkan informasi pengguna yang berhasil ditemukan
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        console.log("Logout berhasil"); // Menampilkan pesan bahwa logout berhasil
        res.status(200).json({msg: "Anda telah logout"});
    });
}
