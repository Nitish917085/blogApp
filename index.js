const express = require("express")
const app=express()
const mongoose = require("mongoose")
const routes= require('./routes')
const multer =require('multer')
var bodyParser = require('body-parser')




const cors=require('cors');

const corsOrigin ={
    origin:'*', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
  }
app.use(cors(corsOrigin))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',express.static('uploads'))


main().catch(err => console.log(err));
main().then(err=>{
    console.log("database connected");
})
async function main() {
  await mongoose.connect('mongodb+srv://blog_app:7EajBZjvewvBuZLE@cluster0.f93y4ir.mongodb.net/blog_app?retryWrites=true&w=majority');
}

app.use('/',routes)


const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server started")
})