const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:String
    },
    categoryImage:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("category",categorySchema)