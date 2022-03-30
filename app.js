const express=require('express');
const mongoose=require('mongoose');
const customerRoute=require('./routes/customer.route')
const bodyparser=require('body-parser')
const cors=require('cors')
const port=process.env.PORT||3000;
const app=express();

app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
mongoose.connect("mongodb+srv://lucky:1234@cluster1.bvxkm.mongodb.net/testDB?retryWrites=true&w=majority").then(()=>{
    console.log("database connected")
}).catch(err=>{
    console.log(err)
})

app.use('/',customerRoute);

app.listen(port,()=>{
    console.log("server is going on")
})