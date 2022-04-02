const { request } = require("express");
const { response } = require("express");
const express=require("express");
const customer=require("../model/customer.model")
const category=require('../model/category.model')
const jwt=require("jsonwebtoken");

const multer=require('multer')
const route=express.Router();

var storage=multer.diskStorage({
    destination:'public/images',
    filename:function(request,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
});
var upload=multer({storage:storage});


route.post("/signup",(request,response)=>{
        console.log(request.body);
        customer.create({
            username:request.body.username,
            email:request.body.email,
            password:request.body.password
        }).then(result=>{
            console.log(result);
            return response.status(201).json(result)
        }).catch(err=>{
            console.log(err);
            return response.status(500).json({message:"oops something went wrong"})
        })
})

route.post("/signin",(request,response)=>{
    console.log(request.body);
    customer.findOne({
        email:request.body.email,
        password:request.body.password
    }).then(result=>{
        console.log(result);
        
        if(result){
            let payload={subject:result._id}
            let token=jwt.sign(payload,"dsfdsfgsgfdsiohgoihdhhgdghid")
            console.log(token)
            return response.status(201).json({"token":token,"result":result})
        }
        else{
            return response.status(500).json({message:"login failed"})
        }
        
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:"oops something went wrong"})
    })
})

route.post("/add-category",upload.single("categoryImage"),(request,response)=>{
        console.log(request.file.filename);
        category.create({
            categoryName:request.body.categoryName,
            categoryImage:"https://newproject0.herokuapp.com/images/"+request.file.filename

        }).then(result=>{
            console.log(result);
            return response.status(201).json(result)
        }).catch(err=>{
            console.log(err)
            return response.status(500).json({message:"oops somethig went wrong"})
        })
        
})

route.get("/customer-list",(request,response)=>{
    console.log(request.body);
    customer.find().then(result=>{
        console.log(result);
        return response.status(201).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({message:"oops something went wrong"})
    })
})

module.exports=route;