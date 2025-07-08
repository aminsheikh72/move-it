const User = require('../models/userSchema')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const register = async(req,res)=>{

    // extract field from req.body
    const {name,email,phone,password,isAdmin}= req.body 

    // check all fields
    if(!name || !email || !phone || !password){
        res.status(400)
        throw new Error("please fill all details")
    }

    // check user exist
    const existEmail = await User.findOne({email : email})
    const existPhone = await User.findOne({phone : phone})
    if(existEmail || existPhone){
        res.status(400)
        throw new Error("user already exist")
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    // user create
    const user = await User.create({name,email,password : hashPassword,phone,isAdmin})
    if(!user){
        res.status(400)
        throw new Error("user not created")
    }
    res.status(201)
    res.json({
        id : user._id,
        name : user.name,
        email : user.email,
        phone : user.phone,
        token : generateToken(user._id),
        isAdmin : user.isAdmin
    })
    
}
const login = async(req,res)=>{
   const {email,password}= req.body

    // check all fields are comin
   if(!email || !password){
    res.status(400)
    throw new Error("please fill all details")
   } 
   const user= await User.findOne({email : email}).select("+password")
  if(!user){
    res.status(404)
    throw new Error("User not fount")
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    res.status(400)
    throw new Error("Invalid credentials")
  }
  res.status(200).json({ id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    token: generateToken(user._id),
    isAdmin: user.isAdmin,})
}

const generateToken=(id)=>{
const token = jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn : '20d'
})
return token;

}

const privateController=async(req,res)=>{
    
    
    res.status(200).json(req.user)
}



module.exports = {register,login,privateController}