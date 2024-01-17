const express = require("express");
const app = express();
const dotenv = require("dotenv");
const multer = require("multer")


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/Post");

dotenv.config();
require('./connection')


app.use(express.json());
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "images")//iska mtlb ki hame file kon se folder me upload krna hai
//     }, filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//     }
// });

// const upload = multer({ storage: storage }).single("user_file");



app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes)
app.use("/api/post/", postRoutes);



app.listen("5000", () => {
    console.log("Server is running");
});