const express = require("express")
const {UserModel}=  require("../models/user.models")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {authenticate} = require("../controller/auth.controller")
const {BlackList} =require("../models/blacklist.model")

//register user
userRouter.post("/register",async(req,res)=>{
    const {name,email,password,role} = req.body
    try {
        const userEx = await UserModel.findOne({email})
        if(userEx){
            res.status(400).send({msg:"User already exist"})
        }
        const hash = bcrypt.hashSync(password,5)
        const user = new UserModel({name,email,password:hash,role})
        await user.save()
        res.status(200).send("successful")
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

//login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const userExist = await UserModel.findOne({email})
        if(!userExist){
            res.status(400).send({msg:"User doesnot exist, please register"})
        }
        const isPassword = await bcrypt.compare(password,userExist.password)
        if(!isPassword){
            res.status(400).send({msg:"Wrong password"})
        }
        const token = jwt.sign({userid:userExist._id,role:userExist.role},process.env.JWT_ACCESS_TOKEN,{expiresIn:60})
        const refreshToken = jwt.sign({userid:userExist._id,role:userExist.role},process.env.JWT_REFRESh_TOKEN,{expiresIn:180})

        res.status(200).send({msg:"Login Successful",token,refreshToken})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

userRouter.get("/logout",authenticate,(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    const decoded = jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
    if(!decoded){
          res.status(400).send({"msg":"Access not granted"})
    }
    BlackList.token = decoded.userid
    res.status(200).send("Logged Out")


})

module.exports = {userRouter}