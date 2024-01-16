const jwt=require("jsonwebtoken")
const verifyToken=(req,res,next)=>{

    const authHeader=req.headers.token;

    if(authHeader){
        jwt.verify(authHeader,process.env.JWT_SEC,(err,user)=>{
            if(err)    return res.status(401).json("Token is not valid");
            
            req.user=user;
            next();

        });
    }else{
        return res.status(401).json("You are not authenticated");
    }
}


const verifytokenAndAuthorization=(req,res,next)=>{
verifyToken(req,res,()=>{
    if(req.user.isAdmin){
        next();
    }else{
        res.status(403).json("You are not admin,you can not do this");
    }
})
}





module.exports={verifyToken,verifytokenAndAuthorization}
