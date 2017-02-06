var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")
    
var Strain      = require("./models/strain");

var seed        = [
                    {
                        name: "BuBa",
                        image: "http://www.thenug.com/sites/default/pub/040314/thenug-wmNRDwnFBq.jpg",
                        description: "blah blah blah"
                    },
                    {
                        name: "BuBa",
                        image: "http://www.thenug.com/sites/default/pub/040314/thenug-wmNRDwnFBq.jpg",
                        description: "blah blah blah"
                    }
                ]
    
    
    Strain.create(seed, function(){});
    
    mongoose.connect("mongodb://localhost/s-strains");
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    
    
    
    
    app.get("/", function(req, res){
        res.render("landing"); 
    });
    
    app.get("/strains", function(req, res){
        Strain.find({}, function(err, strains){
            if(err)
                console.log("findind err: " + err)
            else
                res.render("./strains/index", {strains: strains});
        });
    });
    



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});
    
