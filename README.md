<!-- -------------setup---------------- -->
FE1: npm create vite@latest 

BE1: 
    1. npm init -y
    2. npm install express mongoose cookie-parser cloudinary socket.io
    3. install nodemon

<!-- ------------- initial server setup ----------- -->
BE2: 
    1. Created index.js file 
    2. And created a small server using express and also app is listening at port 5001

BE3: 
    1. create the POST method for signup, login and logout. POST method because we will be sending username and password
    2. Routes are defined in back-end/src/routes/auth.route.js path and we are importing it in index.js and used - app.use("/api/auth/",authRoutes) - endpoint is -> //http://localhost:5001/api/auth/logout - we need to use the route like this
    3. The functionalities of this route or route handlers are written in controllers folder - back-end/src/controllers/auth.controllers.js

<!-- ------------ creating mongoDB cluster and env file --------- -->
BE4: 
    1. copy the connection url from mongoBD cluster
    2. create a .env file and add the config related details in this file, such as MONGO_URL, PORT ....
    3. How can we use data from .env file
         import dotenv from "dotenv"
         dotenv.config()
         PROCESS.evn.PORT

<!-- ------ create mongoDB connection -------- -->
BE5:
    1. Write DB connection code in lib/db.js using mongoose.connect()

<!-- ------ create mongoDB schema and model -------- -->
BE6: 
    Create collection in mongoDB
    1. Usermodel:
        . fullName
        . Email
        . password
        . profilepic
        - _id
        - createdAt
        - updatedAt
    2. message model:
        . senderId
        . receiverId
        . text
        . images
    a. Write a user model and message model in /model folder using mongoose
        > const userSchema = mongoose.schema({})
        > const User = mongoose.model("User", userSchema)
        > export default User;

<!-- ------ create signup logic -------- -->
BE7: 
    1. Collect the client send details from req.body (use middleware express.json - app.use(express.json()))
    2. add validatins and check if all data received
    3. Hash the password using bcryptjs using salt
    4. Create token to let them know that they are authenticated - generateToken function in - [token](lib/utils.js)
        a. we need import jwt from "jsonwebtoken"
        b. send the token as response and store it in cookie for 7 days - using res.cookie

<!-- ------ create login and logout logic -------- -->
BE8: 
    1. email and password is sent as data from client. 
    2. check the details and validate it
    3. If valid generateToken and send the user details
    4. for logout clear the cookie and send the response

BE9: Update profile code
    1. Before updating the profile, check for the authentication using protectRoute logic as middleware and then
    2. Write the code for update profile. 
    3. also add a checkAuth route whenever user refreshes the page, show the profile or login page
    

