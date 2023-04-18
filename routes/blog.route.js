const express=  require("express")
const blogRouter = express.Router()
const {authorized} = require("../controller/authorize.controller")

const {BlogModel} = require("../models/blog.models")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { UserModel } = require("../models/user.models")

blogRouter.post("/post",authorized(["User"]),async(req,res)=>{

    try {
        const blog = new BlogModel(req.body)
        await blog.save()
        res.status(200).send({"msg":"Blog Posted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

blogRouter.get("/get",authorized(["User"]),async(req,res)=>{
    try {
        const blog = await BlogModel.find()
        res.status(200).send(blog)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

blogRouter.patch("/update/:blogID",authorized(["User"]),async(req,res)=>{
    const payload = req.body
    const token = req.headers.authorization?.split(" ")[1]
    const decoded = jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
    const blog_ID = req.params.blogID
    const req_id = decoded.userid
    const blog = await BlogModel.findOne({_id:blog_ID})
    const user_Id_in = blog.userID
    try {
        if(user_Id_in===req_id){
            console.log("done")
            await BlogModel.findByIdAndUpdate({_id:blog_ID},payload)
            res.status(200).send({"msg":"Blog Updated"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

blogRouter.delete("/delete/:blogID",authorized(["User"]),async(req,res)=>{
    
    const token = req.headers.authorization?.split(" ")[1]
    const decoded = jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
    const blog_ID = req.params.blogID
    
    const req_id = decoded.userid
    const blog = await BlogModel.findOne({_id:blog_ID})
    const user_Id_in = blog.userID
    try {
        if(user_Id_in===req_id){
            await BlogModel.findByIdAndDelete({_id:blog_ID})
            res.status(200).send({"msg":"Blog Deleted"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

blogRouter.delete("/deleteMod/:blogID",authorized(["Moderator"]),async(req,res)=>{
    const blog_ID = req.params.blogID
    const blog = await BlogModel.findOne({_id:blog_ID})

    try {
        if(blog){
            await BlogModel.findByIdAndDelete({_id:blog_ID})
        res.status(200).send({"msg":"Blog Deleted"})
        }
        else{
            res.status(400).send({"msg":"Blog doensot exist"})
        }
       
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = {blogRouter}