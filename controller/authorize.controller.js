require("dotenv").config()
const jwt = require("jsonwebtoken")
const authorized = (roles)=>{
    return (req,res,next)=>{
        const token = req.headers.authorization?.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
        
        const userRole = decoded.role
        console.log(userRole)
        if(roles.includes(userRole)){
            next()
        }
        else{
            res.status(400).send("Unauthorized...")
        }
    }
}

module.exports = {authorized}