var mongoose = require("mongoose");

var strainSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        // need to input the user model in here
    }
});

module.exports = mongoose.model("strain", strainSchema);