function partnerMiddleware(req, res, next) {
    const role = req.user.role;

    if (role === "partner") {
        return next();
    } else {
        console.log("Partner middleware: unauthorized access attempt by role:", role);
        return res.status(403).json({ message: "Access denied, only partners allowed" });
    }
}

module.exports = partnerMiddleware;
