const express = require("express")
require("dotenv").config()
const {connection} = require("./config/db")
const {authenticate} = require("./controller/auth.controller")
const {userRouter} = require("./routes/user.route")
const {blogRouter} = require("./routes/blog.route")
const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/blogs",blogRouter)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Connection Succesfull")
})