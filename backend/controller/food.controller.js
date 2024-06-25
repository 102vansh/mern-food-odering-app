const foodmodel = require('../models/food.model')

const cloudinary = require('cloudinary')
exports.createfood = async(req,res,next) =>{
    try{
const{name,description,price,category} = req.body
const {image} = req.files

const cloudinaryres = await cloudinary.uploader.upload(image.tempFilePath)
if (!cloudinaryres || cloudinaryres.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryres.error || "Unknown cloudinary error!"
    );
  }

  const food = await foodmodel.create({name,description,price,category,image:{
    public_id:cloudinaryres.public_id,
    url:cloudinaryres.secure_url
  }})
return res.status(201).json({
success:true,
message:"food created successfully",
food
   })
    }catch(error){
        return next(error)
    }
}
exports.getallfood = async(req,res,next) =>{
    try{
const food = await foodmodel.find()
return res.status(200).json({
    success:true,
    food
   })
    }catch(error){
        return next(error)
    }
}

exports.deletefood = async(req,res,next) =>{
    try{
const food = await foodmodel.findByIdAndDelete(req.params.id)
return res.status(200).json({
    success:true,
    food
   })
    }catch(error){
        return next(error)
    }
}