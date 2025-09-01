import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    console.log(req.body)
        try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            res.status(400).json({message: "All fields is mandatory"})
        }

        console.log(fullName, email, password)
        if(password.length < 6){
            res.status(400).json({message: "Password must be atleast 6 characters"})
        }

        const user = await User.findOne({email});
        if(user){
            res.status(400).json({message: "Email already exists"});
        }

        //create hash password using salt
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        //create newuser
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashPassword
        })

        //generate token 
        if(newUser){
            //generate token here
            generateToken(newUser._id, res);
            newUser.save()

            //send success message telling soemthing created using 201 status
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

        } else {
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (err) {
        console.log(`Error in signup controller ${err.message}`)
        res.status(500).json({message: "Internal Server error"})        
    }
}

export const login = async(req, res) => {
const {email, password} = req.body
console.log("email ==> ", email, password)

try {
    const user =await User.findOne({email});
    if(!user){ //check if user exists
        res.status(400).json({message:"Invalid credentials"})
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){ //check if valid password
        res.status(400).json({message:"Invalid credentials"}) 
    }

    let token = generateToken(user._id, res); //generate token 
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic})

} catch (err) {
    console.log(`Error in login controller ${err.message}`)
    res.status(500).json({message: "Internal Server error"})            
}
}

export const logout = (req, res) => {
    try {
        //while logging out we will just clear the jwt token in cookie
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message:"Logged out successfully"}) 
    } catch (err) {
        console.log(`Error in logout controller ${err.message}`)
        res.status(500).json({message: "Internal Server error"})     
    }
}

export const updateProfile = async(req, res) => {
    try {
        const profilePic = req.body;
        const userid = req.user._id;

        if(!profilePic){
        res.status(400).json({message:"Profile pic is required"})
        }

        //upload profile pic to cloudinary
        const uploadResponse =  await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userid, {profilePic: uploadResponse.secure_url}, {new: true}); //new:true returns updated data

        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(`Error in updateProfile controller ${err.message}`)
        res.status(500).json({message: "Internal Server error"})      
    }

}

//this function is used for returning authenticated user
//It will come to use when we are refreshing the page
export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (err) {
        console.log(`Error in checkAuth controller ${err.message}`)
        res.status(500).json({message: "Internal Server error"})   
    }
}