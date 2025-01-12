const express = require("express");
const app = express();
require("./db/conn");
const UserData = require("./model/UserData");
const Datarouter = require("./router/router");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/auth/api",Datarouter);


app.listen(PORT , ()=>{
    console.log("Port no is ", PORT);
    
})








// app.post("/register",async(req, res)=>{
//     const {name, email, password} = req.body;
//     const Ispresent = await UserData.findOne({email:email});
//     if(Ispresent){
//         return res.status(400).send("User already exist");
//     }
//     const data = new UserData({
//         name: name,
//         email: email,
//         password: password
//     })
//     const dataSave = await data.save();
//     res.status(201).send(dataSave);
// })