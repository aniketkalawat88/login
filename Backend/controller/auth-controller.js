const bcrypt = require("bcrypt");
const UserData = require("../model/UserData");

const loginGet = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const data = await UserData.find();
        res.status(200).send(data);
    }catch(e){
        res.status(400).send("error from login router",e);
    }
}

const login = async(req, res)=>{
    try{
        const {email, password} = req.body;    
        const IsValid = await UserData.findOne({email: email});
        if(!IsValid){
           return res.send("Data is Not Present");
        }

        const ValidPassword = await bcrypt.compare(password, IsValid.password);

        // if(password=== IsValid.password){
        //     console.log("password Match");
        // }else{
        //     return res.send("Password wrong");
        // }
        if(ValidPassword){
            res.status(200).send({msg:"SuccessFUll Login", token: await IsValid.generateToken()});
        }else{
            res.status(400).send("Password Not match");
        }
    }catch(e){
        res.status(400).send("error from post Api Login");
    }
}

const register = async(req, res)=>{
    const {name, email, password} = req.body;
    const Ispresent = await UserData.findOne({email:email});
    if(Ispresent){
        return res.status(400).send("User already exist");
    }
    // const hash_Password = await bcrypt.hash(password ,10);
    
    const dataSave = await UserData.create({
        name: name,
        email: email,
        password: password
    })
        res.status(201).json({msg: "Successful login", token: await dataSave.generateToken(), userId: dataSave._id.toString(    )});
}

const user = async(req, res)=>{
    try{
        const data = req.user;
        console.log(data);
        res.status(200).json(data);
    }catch(e){
        res.status(400).send("error from user Schema field");
    }

    }

module.exports = {loginGet ,login ,register, user};