
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check for "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const authUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.name,
            role: authUser.role
        };

        next(); // Continue to the protected route
    } catch (error) {
        console.log("auth error:", error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
