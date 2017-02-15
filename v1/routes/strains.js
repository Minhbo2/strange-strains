var mongoose    = require("mongoose"),
    express     = require("express"),
    router      = express.Router(),
    Strain      = require("../models/strain"),
    upload      = require("../middleware/multer"),
    middleware  = require("../middleware/index")
    
    
    
    // show all the strains
    router.get("/strains", function(req, res){
        
        Strain.find({}, function(err, strain){
            if(err)
                res.redirect("/");
            else
                res.render("./strains/index", {strain: strain}); 
        });
    });
    
    
    // new strain form
    router.get("/strains/new", middleware.isLoggedIn,function(req, res){
        res.render("./strains/new");
    });
    
    
    // submitting a new strain
    router.post("/strains", middleware.isLoggedIn, function(req, res){
    
        upload(req, res, function(err){
            if(err)
                return res.send(err);
            
            var name    = req.body.name;
            var image   = "/upload/" + req.file.filename;
            var descr   = req.body.description;
            var author  = {
                            id: req.user._id,
                            username: req.user.username
                        }
            
            var newStrain = {name: name, image: image, description: descr, author: author}
            
            Strain.create(newStrain, function(err){
                if(err)
                    return res.send(err);
                
                res.redirect("/strains");
            });
        });
    });
    
    
    // Show strain id
    router.get("/strains/:id", function(req, res){
        Strain.findById(req.params.id, function(err, strain){
            if(err)
                res.send(err);
            else
                res.render("./strains/show", {strain: strain});
       });
    });
    
    
    
module.exports = router;