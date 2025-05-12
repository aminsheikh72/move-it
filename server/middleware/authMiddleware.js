const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const protect = async(req,res,next)=>{
    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decode.id).select("-password")
            if(user){
                req.user = user
                next()
            }
            else{
                res.status(401)
                throw new Error("unauthorize user!! please send the token")
            }    
        }
        else{
            res.status(401)
        throw new Error("unauthorize user!! please send the token")
        }
    } catch (error) {
        res.status(401)
        throw new Error("unauthorize user!! please send the token")
    }

}
module.exports = protect