const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    if(!req.header('Authorization')){
        req.isAuth = false;
        return next();
    }

    const token = req.header('Authorization').replace('Bearer ', '');

    if(!token) {
        req.isAuth = false;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            throw new Error('Not authenticated.');
        }

        req.isAuth = true;
        req.userId = decoded._id;

        next();
    } catch (e) {
        req.isAuth = false;
        return next();
    }
};

module.exports = auth;
