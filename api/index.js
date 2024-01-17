const express = require("express");
const app = express();
const dotenv = require("dotenv");


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/Post");

dotenv.config();
require('./connection')


app.use(express.json());



app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes)
app.use("/api/post/", postRoutes);




app.listen("5000", () => {
    console.log("Server is running");
});