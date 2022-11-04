const dbConfig = require('../database/init-db');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

const registerAdmin = async (req , res) => {

    const email = req.body.email;
    const password = req.body.password;
    const adminExists = await dbConfig.admin.findOne({where: {email: email}});
    
    if(adminExists){
        res.status(400)
        return res.json({
            "message": "Admin already exists. Please login!"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt)
    
    const admin = await dbConfig.admin.create({
        email: email,
        password: password_hash
    })

    if (admin) {
        return res.status(201).json({
            id: admin.id,
            email: admin.email,
            token: generateToken(admin.id)
        })

    } else {
        return res.status(400).json({
            "message": "Invalid user data."
        })
    }
}

const login = async (req , res) => {
    const email = req.body.email;
    const password = req.body.password;

    const adminExists = await dbConfig.admin.findOne({where: {email: email}});

    if(!adminExists){
        res.status(400)
        return res.json({
            "message": "Admin doesn't exist. Please register first!"
        })
    }

    const login_verdict = await bcrypt.compare(password, adminExists.dataValues.password);

    if (login_verdict) {
        res.status(200);
        return res.json({
            "message": "Login Successful!",
            "token": generateToken(adminExists.dataValues.id)
        })
    } else {
        res.status(400);
        return res.json({
            "message": "Login Failed, please check credentials."
        })
    }
}

module.exports = { registerAdmin , login}
