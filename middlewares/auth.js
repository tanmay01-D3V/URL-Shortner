const { getUser } = require("../service/auth");

async function restrictToLoggedInUsersOnly(req,res,next){
    const userUid = req.cookies?.uid;
    if (!userUid) return res.redirect("/login");
    const userData = getUser(userUid);
    if (!userData) return res.redirect("/login");
    req.user = userData;
    next();
}

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;

    const userData = getUser(userUid);
    
    req.user = userData;
    next();
}

module.exports = {restrictToLoggedInUsersOnly, checkAuth};