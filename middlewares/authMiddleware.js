const jwt = require('jsonwebtoken')
const dbConfig = require('../database/init-db');

const protect = async (req , res , next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded= jwt.verify(token, process.env.JWT_SECRET)
            req.user = await dbConfig.admin.findOne({where: {id: decoded.id}}).dataValues
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            return res.json({
                "message": "Not Authorized, invalid token.",
                "error": error
            })
        }
    }
    if(!token)
    {
        res.status(401)
        return res.json({
            "message": "Not Authorized, no token."
        })
    }
}

module.exports = { protect }