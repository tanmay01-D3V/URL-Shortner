const { getUser } = require("../service/auth");

async function restrictToLoggedInUsersOnly(req, res, next) {
    const authHeader = req.headers['authorization'];
    let userUid = req.cookies?.uid;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        userUid = authHeader.split(' ')[1];
    }

    if (!userUid) return res.status(401).json({ error: "Authentication required" });

    const userData = getUser(userUid);
    if (!userData) return res.status(401).json({ error: "Invalid or expired token" });

    req.user = userData;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;

    const userData = getUser(userUid);

    req.user = userData;
    next();
}

module.exports = { restrictToLoggedInUsersOnly, checkAuth };