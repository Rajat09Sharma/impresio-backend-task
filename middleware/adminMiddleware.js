
function adminMiddleware(req, res, next) {
    const role = req.user.role;

    if (role == "admin") {
        next();
    } else {
        console.log("Admin middleware: unauthorized access attempt by role:", role);
        return res.status(403).json({ message: "Access denied, only admin allowed" });
    }

}

module.exports = adminMiddleware;