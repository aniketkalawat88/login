const  mongoose  = require("mongoose");

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        requried :true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
const UserdataModel = new mongoose.model("UserData", loginSchema);

module.exports = UserdataModel;