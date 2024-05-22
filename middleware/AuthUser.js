import User from "../models/UserModel.js";

// Fungsi middleware untuk memeriksa apakah pengguna sudah terautentikasi
export const verifyUser = async (req, res, next) =>{
    // Memeriksa apakah ada sesi pengguna yang ada
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    // Mencari pengguna berdasarkan uuid dari sesi
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    // Jika pengguna tidak ditemukan, kembalikan respon 404
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    // Menambahkan id pengguna dan peran pengguna ke dalam request
    req.userId = user.id;
    req.role = user.role; 
    next();
}

// Fungsi middleware untuk memeriksa apakah pengguna memiliki peran admin
export const adminOnly = async (req, res, next) =>{
    // Mencari pengguna berdasarkan uuid dari sesi
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    // Jika pengguna tidak ditemukan, kembalikan respon 404
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    // Memeriksa apakah pengguna memiliki peran admin
    if(user.roleId !== 1) return res.status(403).json({msg: "Akses terlarang"});
    next();
}
