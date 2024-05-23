import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) =>{
    console.log("Memeriksa apakah pengguna sudah terautentikasi...");
    if(!req.session.userId){
        console.log("Sesi pengguna tidak ditemukan. Pengguna tidak terautentikasi.");
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }

    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if(!user) {
        console.log("Pengguna tidak ditemukan.");
        return res.status(404).json({msg: "User tidak ditemukan"});
    }

    console.log("Pengguna terautentikasi.");
    req.userId = user.id;
    req.role = user.role; 
    next();
}

export const adminOnly = async (req, res, next) =>{
    console.log("Memeriksa apakah pengguna memiliki peran admin...");
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if(!user) {
        console.log("Pengguna tidak ditemukan.");
        return res.status(404).json({msg: "User tidak ditemukan"});
    }

    if(user.roleId !== 1) {
        console.log("Pengguna tidak memiliki peran admin. Akses terlarang.");
        return res.status(403).json({msg: "Akses terlarang"});
    }

    console.log("Pengguna memiliki peran admin.");
    next();
}
