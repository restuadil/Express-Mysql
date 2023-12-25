import { logger } from "../Utils/logger.js"
import { service } from "../services/service.js"
import { createUserValidation, updateUserValidation } from "../validations/user.validation.js"
import { hashing } from "../utils/hashing.js"

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
        const { username, password, email, img } = value

        const checkEmail = await service("SELECT * FROM users WHERE email = ?", [email]);
        const checkUsername = await service("SELECT * FROM users WHERE username = ?", [username]);

        if (checkEmail.length > 0) return res.status(400).json({ status: false, message: "Email Already Exist" });
        if (checkUsername.length > 0) return res.status(400).json({ status: false, message: "Username Already Exist" });

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
                username || userFormDb[0].username,
                password || userFormDb[0].password,
                email || userFormDb[0].email,
                img || userFormDb[0].img,
                id
            ]);

            logger.info("Succes Update User")
            res.status(200).json({ status: true, message: "Succes Update User", })
        }
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}                               