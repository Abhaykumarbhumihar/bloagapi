const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connection Connected")).catch((error)=>{
    console.log(error)
    console.log("Connection Failed")

})
