var Strain          = require("../models/strain");
var middlewareObj   = {};



// MIDDLEWARE   
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}






middlewareObj.checkStrainOwnership = function(req,res,next){
        // check if user is loggin
    if(req.isAuthenticated()){
        Strain.findById(req.params.id, function(err, foundCampground){
            if(err)
            {
                // req.flash("error", "Campground's not found")
                res.redirect("back");   
            }
            else{
                // if he/she is owning the campground
                if(foundCampground.author.id.equals(req.user.id))
                    next();
                else{
                    // req.flash("error", "You do not have permission to do that");
                    res.redirect("back");   
                }
            }
        });
    }
    else{
        req.flash("error", "Please login!");
        res.redirect("back");   
    }
}





// middlewareObj.commentOwnership = function(req,res,next){
//         if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//             if(err)
//                 res.redirect("back");
//             else{
//                 // if he/she is owning the comment
//                 if(foundComment.author.id.equals(req.user._id))
//                     next();
//                 else{
//                     req.flash("error", "You do not have permission to do that");
//                     res.redirect("back");
//                 }
//             }
//         });
//     }
//     else{
//         req.flash("error", "Please login!");
//         res.redirect("back");
//     }
// }






module.exports = middlewareObj;