const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const token =  req.cookies.token;
    console.log(token);
    if(!token) {
        return res.status(401).json({success: false, message:'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if(!decoded) {
            return res.status(401).json({success: false, message:'Unauthorized'});
        }
        req.userId = decoded.userID;
        next();
    } catch(error) {
        return res.status(401).json({success: false, message:'Unauthorized'});
    }
}

module.exports = {verifyToken}