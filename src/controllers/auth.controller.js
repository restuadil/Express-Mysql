import { logger } from "../Utils/logger.js";
import { service } from "../services/service.js";
import { compare, hashing } from "../utils/hashing.js";
import { signJWT } from "../utils/jwt.js";
import { createUserValidation } from "../validations/user.validation.js";


export const register = async (req, res) => {
    const { error, value } = createUserValidation(req.body);
    const { username, email, password, img } = value
    if (error) {
        logger.error(`ERR: product - create = ${error} `);
        return res.status(400).send({ status: false, message: error.details[0].message });
    }

    try {
        const checkEmail = await service("SELECT * FROM users WHERE email = ?", [email]);
        const checkUsername = await service("SELECT * FROM users WHERE username = ?", [username]);

        if (checkEmail.length > 0) {
            return res.status(400).json({ status: false, message: "Email Already Exist" });
        }
        if (checkUsername.length > 0) {
            return res.status(400).json({ status: false, message: "Username Already Exist" });
        }
        const hashPassword = hashing(password);
        await service("INSERT INTO users (username, email, password, img) VALUES (?, ?, ?, ?)", [
            username,
            email,
            hashPassword,
            img,
        ]);
        logger.info("Succes Create User");
        res.status(201).json({ status: true, message: "Succes Create User" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await service("SELECT * FROM users WHERE username = ?", [username]);

        if (user.length === 0) return res.status(404).json({ status: false, message: "User Not Found" });

        const isValidPassword = compare(password, user[0].password);
        if (!isValidPassword) return res.status(400).json({ status: false, message: "Wrong Password" });

        const token = signJWT({ ...user });
        logger.info("Succes Login");
        res.status(200).json({ status: true, message: "Succes Login", token });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}
