const router = require("express").Router();
const Post = require("../models/Post");

const { verifyToken, verifytokenAndAuthorization } = require("../middleware/verifytoken")

//create new post
router.post("/savePost", verifyToken, async (req, res) => {

    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        photo: req.body.photo,
        userId: req.user.id,
        categories: req.body.categories
    })

    try {
        console.log(req.user);
        const savePost = await newPost.save();
        // console.log(savePost);
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(err);
    }
});

 //update my post
 router.post("/updatePost", verifyToken, async (req, res) => {

    const post=await Post.findById(req.body.id);
    console.log("post user id",post.userId)
    console.log("current user id", req.user.id);
    
    
    if(post.userId==req.user.id){
        try {
            const updatePost = await Post.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
            res.status(200).json(updatePost);
        } catch (error) {
            res.status(500).json(err);
        }
    }else{
        res.status(400).json("You can only update your post");
    }
    
});


//delete post
router.post("/deletePost", verifyToken, async (req, res) => {

    const post=await Post.findById(req.body.id);
    console.log("post user id",post.userId)
    console.log("current user id", req.user.id);
    
    
    if(post.userId==req.user.id){
        try {
           await post.deleteOne();
            res.status(200).json("Post has been deleted.");
        } catch (error) {
            res.status(500).json(err);
        }
    }else{
        res.status(400).json("You can only delte your post");
    }
    
});

//getPost by id
router.post("/getPostbyid",verifyToken,async (req,res)=>{

   try {
    const post = await Post.findById(req.body.id);
    console.log(post);
    res.status(200).json(post);
   } catch (error) {
    res.status(500).json(error);
   }

});

//get all post

router.get("/getAllpost",verifyToken,async (req,res)=>{

    try {
     const post = await Post.find();
     console.log(post);
     res.status(200).json(post);
    } catch (error) {
     res.status(500).json(error);
    }
 
 });


 router.get("/getAllpostbyuserid", verifyToken, async (req, res) => {
    try {
        // Retrieve all posts with the matching userId
        const posts = await Post.find({ userId: req.user.id });
        res.status(200).json(posts);
    } catch (error) {
        // Handle errors
        res.status(500).json(error);
    }
});

module.exports = router;