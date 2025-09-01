import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js"


const app = express()
app.use(express.json())
dotenv.config({ path: "/Users/appiness/Desktop/MERN/CHAT-APP/back-end/src/.env" });

// app.use(authRoutes) // http://localhost:5001/logout - this triggers the route directly
app.use("/api/auth/",authRoutes) //http://localhost:5001/api/auth/logout - we need to use the route like this

const PORT = process.env.PORT  || 5000
console.log("port = " + process.env.PORT)
app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}...`)
    connectDb()
})