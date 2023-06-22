const router = require('express').Router()
const Blog = require('../model/Blog')
const multer =require('multer')

const storage = multer.diskStorage({
    destination: 'uploads/', // specify the destination folder
    filename: (req, file, cb) => {
      cb(null, file.originalname); // use the original file name
    },
  });

 const upload = multer({ storage });


router.get("/getAllBlogs",async (req,res)=>{
    const blogs= await Blog.find({})
    res.json(blogs)
})

router.post("/createBlog",upload.single('image'), async (req,res)=>{ 
     console.log("bod",req.body)   
    const newBlog = await Blog.create({
        title: req.body.title,
        image: req.body.imagePath,
        description: req.body.description,
      });
      res.json(newBlog)
})

router.post("/getBlogId",async (req,res)=>{
    const blogs= await Blog.findById(req.body.id)
    res.json(blogs)
})

router.post("/updateBlog",upload.single('image'),(req,res)=>{

    const {_id,title,imagePath,description} = req.body;

    console.log(_id,title,imagePath,description)
    const updatedBlog = Blog.findByIdAndUpdate(_id, {title,image:imagePath,description}, { new: true })
        .then(updatedDocument => {
            if (updatedDocument) {
            console.log(updatedDocument);
            } else {
            console.log('Document not found.');
            }
        })
        .catch(error => {
            // Error occurred during the update operation
            console.error(error);
        });
    res.json({tiit:"hi"})
})

router.post("/deleteBlogId",async (req,res)=>{
     console.log("DEL",req.body.id)
    const newBlog = await Blog.deleteOne({_id:req.body.id})
    console.log("del",newBlog)
    res.json({tiit:"hi"})
})

module.exports=router