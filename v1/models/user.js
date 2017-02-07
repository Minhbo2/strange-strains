var mongoose    =  require("mongoose");

var userSchema= {
                    username: String,
                    password: String,
                    email: String,
                    image: String,
                    description: String
                }



module.exports = mongoose.model("User", userSchema);