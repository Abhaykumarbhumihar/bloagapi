const mongoose = require("mongoose");
const catrgorySchmea = new mongoose.Schema(
    {
       
      name:{
        type:String,
        require:true
      }

    }, { timestamps: true }
)


module.exports = mongoose.model("Categories", userSchmea);