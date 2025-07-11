function clientMiddleware(req, res, next) {
    const role = req.user.role;

    if (role === "client") {
        return next();
    } else {
        console.log("Client middleware: unauthorized access attempt by role:", role);
        return res.status(403).json({ message: "Access denied, only clients allowed" });
    }
}

module.exports = clientMiddleware;
