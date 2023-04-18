const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
   title:String,
   desc:String,
   device:String,

   userID : String
   
},
{
    versionKey:false
})

const BlogModel = mongoose.model("blog",blogSchema)

module.exports  = {BlogModel}