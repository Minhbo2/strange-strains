var mongoose    = require("mongoose"),
    express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    upload      = require("../middleware/multer")
    
    
    
    
// HOME PAGE
router.get("/", function(req, res){
   res.render("./landing"); 
});
    
    
// show the register form
router.get("/signup", function(req, res){
    res.render("./userprofile/new");
});


// sign up logic
router.post("/signup", function(req, res){
    
    upload(req, res, function(err){
        if(err)
            return res.send(err);
        
        var image       = "/upload/" + req.file.filename;
        var username    = req.body.username;
        var email       = req.body.email;
        var descr       = req.body.description;
        
        var newUser     = new User({username: username, image: image, email: email, description: descr});
        
        User.register(newUser, req.body.password, function(err,user){
            if(err){
                // req.flash("error", err.message);
                console.log("Sign Up " + err);
                return res.redirect("/signup");
            }
       
            passport.authenticate("local")(req,res, function(){
                user.save();
                res.redirect("/strains");
            });
        });
    });
});



// show login form
router.get("/login", function(req, res){
    res.render("./userprofile/login");
});


// login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/strains", 
        failureRedirect: "/login" 
    }), function(req, res){});
    

// user profile
router.get("/strains/user/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err)
            res.send(err);
        else
            res.render("./userprofile/show", {user: foundUser});
   }); 
});



module.exports = router;

