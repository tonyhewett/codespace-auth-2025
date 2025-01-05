const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    // grab token from cookie
    console.log('req.cookies: ' + req.cookies);   
    console.log(req.cookies);    
    const {token} = req.cookies
    // stop if no token
    if (!token) {
         res.status(403).send('please login first')
    }
    // decode token and get id
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log('decode: ' + decode);
        console.log(decode);
        req.user = decode
    } catch (error) {
        console.log(error);
        res.status(401).send('invalid token')
    } 
    // query to db for that user id
    return next();
}

module.exports = auth