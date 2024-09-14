const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/UserData")
.then(()=>{
    console.log("connection Successful");
})
.catch((e)=>{
    console.log("connection error dataBase", e);
    
})