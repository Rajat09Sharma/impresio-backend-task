const User = require("../model/user");
const { generateHashPassword, matchHashPassword } = require("../util/hashPassword");
const { generateJwtToken } = require("../util/jwtToken");

const OTP = 12345;

async function signUpHandler(req, res) {
    const { name, email, password, role, otp } = req.body;

    try {
        if (!name || !email || !password || !role || !otp) {
            res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({ message: "User Already exist." });
        }

        const result = await generateHashPassword(password);
        if (!result.ok) {
            throw new Error(result.message);
        }

        const hashPassword = result.hashPassword;

        const user = await User.create({ name, email, password: hashPassword, role });

        res.status(201).json({ message: "User Signup successfully", user });

    } catch (error) {
        console.log("signup  handler error:-", error);
        res.status(500).json({ message: "Failed to signup" });

    }
}

async function loginHandler(req, res) {
    const { email, password, otp } = req.body;

    try {

        if (!email || !password || !otp) {
            res.status(400).json({ message: "All fields are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Incorrect Email!" });
        }

        const result = await matchHashPassword(user.password, password);
        if (!result.ok) {
            res.status(400).json({ message: "Incorrect Password!" });
        }

        const tokenUser = {
            name: user.name,
            email: user.email,
            role: user.role,
            id: user._id
        }

        const token = await generateJwtToken(tokenUser);
        if (!token.ok) {
            throw new Error(token.message);
        }

        res.status(200).json({
            message: "User login successfully.",
            token: token.token,
            user: tokenUser
        })


    } catch (error) {
        console.log("Login Handler error:", error);
        res.status(500).json({ message: "Failed to login user" });

    }
}

module.exports = {
    signUpHandler,
    loginHandler
}