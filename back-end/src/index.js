import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { connectDb } from "./lib/db.js"


const app = express()

//middlewares
app.use(express.json()) //for parsing req.json
app.use(cookieParser()) //for parsing cookie

//for accessing .env file
dotenv.config({ path: "/Users/appiness/Desktop/MERN/CHAT-APP/back-end/src/.env" });

// app.use(authRoutes) // http://localhost:5001/logout - this triggers the route directly
app.use("/api/auth",authRoutes) //http://localhost:5001/api/auth/logout - we need to use the route like this
app.use("/api/message",messageRoutes)

const PORT = process.env.PORT  || 5001
console.log("port = " + process.env.PORT)
app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}...`)
    connectDb()
})