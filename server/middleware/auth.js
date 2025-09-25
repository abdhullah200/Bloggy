import e from "express";
import jwt from "jsonwebtoken";

const auth= (req, res, next)=>{
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.json({success: false, message: "No token provided"});
    }
    
    // Extract token from "Bearer TOKEN" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(err){
        res.json({success: false, message: "Unauthorized"});
    }
}

export default auth;