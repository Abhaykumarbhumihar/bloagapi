const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")//iska mtlb ki hame file kon se folder me upload krna hai
    }, filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    }
});

const upload = multer({ storage: storage });
module.exports = upload;