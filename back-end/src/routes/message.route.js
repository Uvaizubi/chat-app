import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSideBar, sendMessage } from "../controllers/message.controllers.js";

const router = express.Router()


router.get("/users", protectRoute, getUsersForSideBar ) //get all users in the chat sidebar
router.get("/:id", protectRoute, getMessages ) //get the messages for the particular chat between users
router.post("/send/:id", protectRoute, sendMessage ) //send the message
export default router;