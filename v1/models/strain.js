var mongoose = require("mongoose");

var strainSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("strain", strainSchema);