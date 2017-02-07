var mongoose    =  require("mongoose");

var userSchema= {
                    username: String,
                    password: String
                }



module.exports = mongoose.model("User", userSchema);