var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    multer      = require("multer")
    
    
var Strain      = require("./models/strain"),
    User        = require("./models/user");


    
    mongoose.connect("mongodb://localhost/s-strains");
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    
    
    
    
    
    
    var storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, "./public/upload");
        },
        filename: function(req, file, callback){
            callback(null, Date.now() + file.originalname);
        }
    });
    
    // multer().single("field name must be exactly the same as the input's image name given in the new file")
    var upload = multer({storage: storage}).single("user[image]");
    
    
    
    
    
    // HOME PAGE
    app.get("/", function(req, res){
        res.render("landing"); 
    });
    
    
    // INDEX
    app.get("/strains", function(req, res){
        Strain.find({}, function(err, strains){
            if(err)
                console.log("findind err: " + err)
            else
                res.render("./strains/index", {strains: strains});
        });
    });
    
    
    //SIGN UP PAGE
    app.get("/signup", function(req,res){
        res.render("./userprofile/new");
    });
    
    
    // LOGIN
    app.get("/login", function(req, res){
       res.render("./userprofile/login"); 
    });
    
    
    // USER PROFILE PAGE AFTER SIGN UP
    app.post("/userprofile", function(req, res){
        
        upload(req, res, function(err){
            if(err)
                return console.log(err);
                
            // extracting data from the form
            var name = req.body.user.imagename;
            var image = "/upload/" + req.file.filename;
            var username = req.body.user.username;
            var descr = req.body.user.description;
            var email = req.body.user.email;
            
            var newUser = {username: username, image: image, name: name, description: descr, email: email};
            
            User.create(newUser, function(err, newlyUser){
                if(err)
                    return res.send("Creating User error: " + err);
                
                res.render("./userprofile/index", {newUser: newlyUser});
            });
        });
    });









app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});
    
