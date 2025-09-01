import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

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

export default router;