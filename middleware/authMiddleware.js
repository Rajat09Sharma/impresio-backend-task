
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {

        const authUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("auth middlewaare authuser", authUser);

        req.user = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.name,
            role: authUser.role
        };

        next();
    } catch (error) {
        console.log("auth error:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
