import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne :loggedInUserId } }).select("-password");
        
        return res.status(200).json(filteredUsers)
    } catch (err) {
        console.log(`Error in getUsersForSideBar controller ${err.message}`)
        return res.status(500).json({message: "Internal Server error"})  
    }
}

export const getMessages = async(req,res) =>{
try {
        //we are using id here since we used it in the route as same variabe and we are renaming
        // here for readability
        const {id:userToChatId} = req.params; //other user id
        const myId = req.user._id; //us
    
        const messages = Message.find({
            $or: [
                {senderId:myId, receiverId: userToChatId}, 
                {senderId:userToChatId, receiverId: myId}, 
            ]
        })
    
        return res.status(200).json(messages)
} catch (err) {
    console.log(`Error in getMessages controller ${err.message}`)
    return res.status(500).json({message: "Internal Server error"})
}
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            const imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        //todo: realtime chat functionality goes here => socket.io

        return res.status(201).json(newMessage)
    } catch (err) {
        console.log(`Error in sendMessage controller ${err.message}`)
        return res.status(500).json({message: "Internal Server error"})
    }
}


