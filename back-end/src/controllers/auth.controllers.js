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

export const login = (req, res) => {
    res.send("login")
}

export const logout = (req, res) => {
    res.send("logout")
}