var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    passportLocal       = require("passport-local"),
    passportMongoose    = require("passport-local-mongoose"),
    User                = require("./models/user"),
    Strain              = require("./models/strain")
    
    
var userRouter          = require("./routes/index"),
    strainRouter        = require("./routes/strains"),
    upload              = require("./middleware/multer")


    
mongoose.connect("mongodb://localhost/s-strains");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
    

    
    
// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Use this for encoding and decoding passport!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
   next();
});
    




app.use(userRouter);
app.use(strainRouter);






app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});
    
