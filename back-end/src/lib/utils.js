/**
 * JWT is a token used to securely transmit information between client and server.
 * It has 3 parts:
 * 1. Header → algorithm & type
 * 2. Payload → user data (claims)
 * 3. Signature → verifies token integrity
 */

import jwt from "jsonwebtoken"
export const generateToken = (userId, res) => {

    //generate token 
    const token = jwt.sign({id:userId},process.env.SECRET_KEY, {
        expiresIn: "7d"
    })
    console.log("Generated JWT Token:", token);

    res.cookie("jwt", token, {
        maxAge: 7* 24 * 60 * 60 * 1000, //ms
        httpOnly: true, // prevents XSS attacks cross site scriptinf attacks
        sameSite: "strict", //csrf attach cross site requets forgery attacks
        secure: process.env.NODE_ENV !== "development",
    })
    return token

}