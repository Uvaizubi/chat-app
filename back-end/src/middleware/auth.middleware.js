import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
try {
    const token = req.cookies.jwt;
    console.log("Token from cookie => ", token)
    
    if(!token){
    console.log("Token not provided", token)
       return res.status(401).json({message: "Unauthorized - No token provided"})
    }

    //checking if the user is authenticated user
    const decoded = jwt.verify(token, process.env.SECRET_KEY) 

    if(!decoded){
        return res.status(401).json({message: "Unauthorized - Invalid token"})
    }

    const user = await User.findById(decoded.id).select("-password"); //unselect password because it wont be secure
    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    req.user = user;
    next()
} catch (error) {
    console.log("Error in protected route middleware " + error.message);
    return res.status(500).json({message: "Internal server error"})
}
}