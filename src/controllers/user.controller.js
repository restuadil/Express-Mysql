import { logger } from "../Utils/logger.js"
import bcrypt from "bcrypt"
import { service } from "../services/service.js"
import { createUserValidation, updateUserValidation } from "../validations/user.validation.js"

export const getAllUsers = async (req, res) => {
    try {
        const result = await service("SELECT * FROM users")
        logger.info("Succes Get All Users")
        res.status(200).json({
            status: true,
            message: "Succes Get All Users",
            data: result
        })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await service("SELECT * FROM users WHERE id = ?", [id])
        if (result.length === 0) {
            return res.status(404).json({
                status: false,
                message: "User Not Found"
            })
        }
        logger.info("Succes Get User")
        res.status(200).json({
            status: true,
            message: "Succes Get User",
            data: result
        })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const createUser = async (req, res) => {
    const { error, value } = createUserValidation(req.body);
    if (error) {
        logger.error(`ERR: product - create = ${error} `);
        return res.status(400).send({ status: false, message: error.details[0].message });
    }

    try {
        const checkEmail = await service("SELECT * FROM users WHERE email = ?", [value.email]);
        const checkUsername = await service("SELECT * FROM users WHERE username = ?", [value.username]);

        if (checkEmail.length > 0) {
            return res.status(400).json({ status: false, message: "Email Already Exist" });
        }
        if (checkUsername.length > 0) {
            return res.status(400).json({ status: false, message: "Username Already Exist" });
        }
        const hashPassword = bcrypt.hashSync(value.password, 10);
        await service("INSERT INTO users (username, email, password, img) VALUES (?, ?, ?, ?)", [
            value.username,
            value.email,
            hashPassword,
            value.img,
        ]);

        res.status(201).json({ status: true, message: "Succes Create User" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const userFormDb = await service("SELECT * FROM users WHERE id = ?", [id])
        if (userFormDb.length === 0) {
            return res.status(404).json({
                status: false,
                message: "User Not Found"
            })
        }
        await service("DELETE FROM users WHERE id = ?", [id])
        logger.info("Succes Delete User")
        res.status(200).json({
            status: true,
            message: "Succes Delete User"
        })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const { error, value } = updateUserValidation(req.body);
        const checkEmail = await service("SELECT * FROM users WHERE email = ?", [value.email]);
        const checkUsername = await service("SELECT * FROM users WHERE username = ?", [value.username]);
        if (checkEmail.length > 0) {
            return res.status(400).json({ status: false, message: "Email Already Exist" });
        }
        if (checkUsername.length > 0) {
            return res.status(400).json({ status: false, message: "Username Already Exist" });
        }
        if (error) {
            logger.error(`ERR: product - update = ${error} `);
            return res.status(400).send({ status: false, message: error.details[0].message });
        }
        const userFormDb = await service("SELECT * FROM users WHERE id = ?", [id])
        if (userFormDb.length === 0) {
            return res.status(404).json({
                status: false,
                message: "User Not Found"
            })
        } else {
            await service("UPDATE users SET username = ?,password = ?, email = ?, img = ? WHERE id = ?", [
                value.username || userFormDb[0].username,
                value.password || userFormDb[0].password,
                value.email || userFormDb[0].email,
                value.img || userFormDb[0].img,
                id
            ]);
            logger.info("Succes Update User")
            res.status(200).json({
                status: true,
                message: "Succes Update User",
            })
        }
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}                               