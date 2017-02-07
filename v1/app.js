var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")
    
var Strain      = require("./models/strain"),
    User        = require("./models/user");

// var seed        = [
//                     {
//                         name: "BuBa",
//                         image: "http://www.thenug.com/sites/default/pub/040314/thenug-wmNRDwnFBq.jpg",
//                         description: "blah blah blah",
//                         author: "No One"
//                     },
//                     {
//                         name: "BuBa",
//                         image: "http://www.thenug.com/sites/default/pub/040314/thenug-wmNRDwnFBq.jpg",
//                         description: "blah blah blah",
//                         author: "No One"
//                     }
//                 ]
    
    
    // Strain.create(seed, function(){});
    
    mongoose.connect("mongodb://localhost/s-strains");
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    
    
    
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
        res.render("../userprofile/new");
    });
    
    
    // LOGIN
    app.get("/login", function(req, res){
       res.render("../userprofile/login"); 
    });

    
    // USER DESCRIPTION
    app.get("/signup/user-description", function(req, res){
        res.render("../userprofile/userdescr");
    });
    
    
    // USER PROFILE PAGE AFTER SIGN UP
    app.post("/userprofile/:id", function(req, res){
        // extracting data from the form
        var username    = req.body.username;
        var image       = req.body.image;
        var description = req.body.description;
        var email       = req.body.email;
        
        var user  = {username: username, image: image, description: description, email: email}
        
        User.create(user, function(err, newUser){
            if(err)
                console.log(err + " while creating new user");
            else
                res.render("../userprofile/index", {newUser: newUser});     
        })
    });









app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});
    
