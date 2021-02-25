const jwt = require('jsonwebtoken');

exports.requireSignin = async (req, res, next) => {
    if(req.header.authorization){
        console.log(" require Signin middlware");
        console.log(req.header);
        const token = req.headers.authorization.split(" ")[1];
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({ message: 'Authorization required'})
    }
    next();
}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({message: 'Admin Access Denied'});
    }
    next();
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({message: 'Admin Access Denied'});
    }
    next();
}

