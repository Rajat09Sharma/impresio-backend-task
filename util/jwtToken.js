const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

async function generateJwtToken(user) {

    try {

        const token = await jwt.sign({ ...user }, secretKey, { expiresIn: "1d" });
        if (token) {
            return { ok: true, message: "jwt token created successfully", token: token };
        }

    } catch (error) {
        console.log("jwt error:", error);
        return { ok: false, message: "Failed to generate jwt token" }

    }

}

module.exports = {
    generateJwtToken
}