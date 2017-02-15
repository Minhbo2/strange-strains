var multer = require("multer");

var storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, "./public/upload");
        },
        filename: function(req, file, callback){
            callback(null, Date.now() + file.originalname);
        }
    });
    
    // multer().single("field name must be exactly the same as the input's image name given in the new file")
var upload = multer({storage: storage}).single("image");


module.exports = upload;