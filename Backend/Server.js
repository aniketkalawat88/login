const express = require("express");
const app = express();
require("./db/conn");
const LoginData = require("./model/login");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.post("/",async(req, res)=>{
    try{
        const {email, password} = req.body;    
        const IsValid = await LoginData.findOne({email: email});
        if(!IsValid){
           return res.send("Data is Not Present");
        }
        if(password=== IsValid.password){
            console.log("password Match");
        }else{
            return res.send("Password wrong");
        }
        res.send("SuccessFUll Login");
    }catch(e){
        res.send("error from post Api Login");
    }
})

app.listen(PORT , ()=>{
    console.log("Port no is ", PORT);
    
})