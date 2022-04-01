const express=require("express");
const customer=require("../model/customer.model")
const route=express.Router();

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
        
        if(!result)
        return response.status(201).json({message:"invailid user"})
        return response.status(201).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:"oops something went wrong"})
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