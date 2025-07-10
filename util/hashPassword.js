const bcrypt = require("bcrypt");
const saltRound = 10;

async function generateHashPassword(password) {
    try {
        const hashPassword = await bcrypt.hash(password, saltRound);

        return { ok: true, hashPassword: hashPassword };

    } catch (error) {
        console.log("generateHashPassword-error---------", error);
        return {
            ok: false,
            error: {
                message: "Failed to generate hash password."
            }
        }
    }
}

async function matchHashPassword(hashpass, password) {
    try {

        const match = await bcrypt.compare(password, hashpass);
        console.log("match password----", match);

        if (match) {
            return { ok: true, message: "User password match successfully." }
        } else {
            return { ok: false, error: { message: "Incorrect password." } }
        }

    } catch (error) {
        console.log("matchHashPassword-error--------", error);
        return {
            ok: false,
            error: {
                message: "Failed to match hash password."
            }
        }
    }
}

module.exports = {
    generateHashPassword,
    matchHashPassword
}
