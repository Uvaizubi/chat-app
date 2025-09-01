import express from "express"
import { protectRoute } from "../middleware/auth.middleware";
import { getUsersForSideBar } from "../controllers/message.controllers";

const router = express.Router()


router.get("/users", protectRoute, getUsersForSideBar ) //get all users in the chat sidebar
router.get("/:id", protectRoute, getMessages ) //get the messages for the particular chat between users
router.post("/send/:id", protectRoute, sendMessage ) //send the message
export default router;