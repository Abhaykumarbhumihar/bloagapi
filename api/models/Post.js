const mongoose = require("mongoose");
const postSchmea = new mongoose.Schema(
    {
       
        title:{
            type:String,
            require:true

        },
        description:{
            type:String,
            require:true
        },
        photo:{
            type:String,
            default:"",
            require:false
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
        categories:{
            type:String,
            //ref:"Categories",
            require:false
        },

    }, { timestamps: true }
)


module.exports = mongoose.model("Posts", postSchmea);