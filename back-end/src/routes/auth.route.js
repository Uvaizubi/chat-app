import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

/**
 * In Node.js with Express, express.Router() is used to create modular, mountable route handlers.
 * It helps you split your API or web app into smaller, maintainable pieces instead of writing all routes in one big app.js file.
 * 
 * 🔹 Why use express.Router()?
 * 1. Modularity – Organize routes by feature (e.g., /users, /products, /orders).
 * 2. Reusability – You can export routers and plug them into different apps or microservices.
 * 3. Middleware Scoping – You can attach middleware to a router, and it will only apply to that router.
 * 4. Cleaner Code – Keeps your app.js (main file) lightweight.
 */
const router = express.Router()

router.post("/signup", signup)
router.post("/login",login)
router.post("/logout", logout)

//it should be authenticated 
/**
 * 1. Authentication is happening at protectRoute(middleware) and
 * 2. only if it is authenticated we are moving to next functionality updateProfile
 * 3. using next() method
 */
router.put("/update-profile", protectRoute, updateProfile) 

router.get("/check", protectRoute, checkAuth)

export default router;