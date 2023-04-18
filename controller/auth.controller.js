const jwt = require("jsonwebtoken")
require("dotenv").config()
const {UserModel} = require("../models/user.models")
const {BlackList} = require("../models/blacklist.model")

const authenticate = async (req,res,next) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(BlackList.token){
            return res.status(400).send({msg:"Unauthorized"})
        }
        const decoded = jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
        console.log(decoded)
        if(decoded){
            req.body.userID = decoded.userid
            next()
        }

      

       
       
    } catch (error) {
        res.status(400).send({"msg":`Unauthorized: ${error.message}`})
    }
}

module.exports = {authenticate}