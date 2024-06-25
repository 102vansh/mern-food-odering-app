
//  const jwt = require("jsonwebtoken");
// const{ErrorHnadler} = require('../middleware/error')
// const User = require('../models/user.models')

// exports.isAuthenticated = async (req, res, next) => {
//     try{
//     const { token } = req.cookies;
//     console.log(token)
//     if (!token) {
//         console.log("Please Login to access this resource", 401);
//     }
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
      
    
    
//     req.user = await User.findById(decoded.id);
//     console.log(req.user)
//     next();
// }
// catch(error){
//     return next(error)
// }
// };


const jwt = require("jsonwebtoken");
const User = require('../models/user.models');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Please Login to access this resource" });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
