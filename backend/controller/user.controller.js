const User = require('../models/user.models')
const {ErrorHandler} = require('../middleware/error')

exports.register = async(req,res,next)=>{
try{
const{name,email,password} = req.body
if(!name || !email || !password){
    return next(new ErrorHandler('Please enter all fields',400))
}
let user = await User.findOne({email})
if(user){
    return next(new ErrorHandler('User already exists',400))
}
user = await User.create({
    name,
    email,
    password
})
return res.status(201).json({
    success:true,
    message:'Registered successfully',
    user
})
}catch(error){
return next(error)
}
}

exports.login = async(req,res,next)=>{
    try{
    const {email,password} = req.body
    if(!email || !password){
        return next(new ErrorHandler('Please enter all fields',400))
    }
    const user = await User.findOne({email})
    if(!user){
        return next(new ErrorHandler('Invalid credentials',400))
    }
    const isPasswordMatch = await user.comparepassword(password)
    if(!isPasswordMatch){
        return next(new ErrorHandler('Invalid credentials',400))
    }
    const option = {
        expiresin: new Date(
            process.env.COOKIE_EXPIRE * 24 *60 *60* 1000
        ),
        httpOnly:true
    }
    
    const token = await  user.generateToken()
    // console.log(token)
     res.status(200).cookie('token',token,option).json({
        success:true,
        message: ' you are Logged in',
        user,
        
        token
    })
    }catch(error){
    return next(error)
    }
}
exports.logout = async(req,res,next)=>{
    try{
        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        return res.status(200).json({
            success:true,
            message:'Logged out'
        })
    }catch(error){
        return next(error)
    }
}