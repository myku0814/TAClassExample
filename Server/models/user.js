const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({
    user: String,
    pwd: String
});
 
module.exports = mongoose.model("Users", userSchema);

