const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const { verifyToken, verifytokenAndAuthorization } = require("../middleware/verifytoken")

router.post("/update",verifyToken,async(req,res)=>{

    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString();
    }

    console.log(req.body);

    try {
        const updateUser=await User.findByIdAndUpdate(req.user.id,{ 
            $set:req.body
        });
        console.log(updateUser);
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(err);
    }



});

router.get("/getAlluser",verifytokenAndAuthorization,async(req,res)=>{
    try {
        const alluser=await User.find();
        res.status(200).json(alluser);
    } catch (error) {
        res.status(500).json(err);
    }
});

router.get("/getprofile",verifyToken,async(req,res)=>{
    try {
        const userData = await User.findById(req.user.id);
        const { password, __v, ...others } = userData._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/deletemyprofile",verifyToken,async(req,res)=>{

    try {
        //yaha pe pahle sare post delete krne hai
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(err);
    }

});
module.exports = router;
