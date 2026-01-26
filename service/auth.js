const jwt = require("jsonwebtoken");
const secret = "urlTanmay&123";

function setUser (user){
    return jwt.sign({
        _id: user._1,
        email: user.email,
    },secret)
}

function getUser (token){
    if (!token) return null;
    try{
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }  return jwt.verify(token,secret)
}

module.exports = {setUser, getUser};