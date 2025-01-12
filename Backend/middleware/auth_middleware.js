const jwt = require("jsonwebtoken");
const user = require("../model/UserData");

const authMiddleware = async(req, res, next)=>{
    const token = req.header("Authorization");

    const jwtToken = token.replace("Bearer ","").trim();
    try{
        const isVerify = jwt.verify(jwtToken,"thisIsLoginAndRegisteratiionKey");
        const userData = await user.findOne({email: isVerify.email}).select({password:0});
        
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        
        next();
    }catch(e){
        return res.status(401).json("Unauthorized token");
    }
}

module.exports = authMiddleware;