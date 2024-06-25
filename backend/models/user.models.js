const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"], 
    },
    password: {
        type: String,
        required: true
    },
    cartdata:{
        type:Object,
        default: {}
    }
    
},{timestamps: true});
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})
userSchema.methods.comparepassword = async function(password){  
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateToken = async function(){
    return jwt.sign({id: this._id}, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRESIN});
}
module.exports = mongoose.model("User", userSchema)