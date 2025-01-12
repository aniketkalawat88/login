const  mongoose  = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        requried :true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},
// {timestamps : true}
)

loginSchema.pre('save',async function(next){
    try{
        if(this.isModified("password")){
            const hash_Password = await bcrypt.hash(this.password, 10);
            this.password = hash_Password;
        }
        next();
    }catch(e){
        console.log("hash not "); 
        
    }
})

loginSchema.methods.generateToken = async function(){
    try{
        return jwt.sign(
            {
                userId: this._id.toString(),
                email:this.email
            },
            "thisIsLoginAndRegisteratiionKey",
            {
                expiresIn: "1h"
            }
        )
    }catch(e){
        console.log("error from token");
        
    }
}



const UserdataModel = new mongoose.model("UserData", loginSchema);

module.exports = UserdataModel;