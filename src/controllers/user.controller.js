import { logger } from "../Utils/logger.js"
import db from "../Utils/server.js"
import { createUserValidation } from "../validations/user.validation.js"

export const getAllUsers = async (req, res) => {
    db.query(
        `SELECT * FROM users`,
        (err, result) => {
            if (err) {
                logger.error(err.message)
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            }
            logger.info("Succes Get All Users")
            res.status(200).json({
                status: true,
                message: "Succes Get All Users",
                data: result
            })
        }
    )
}

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    db.query(
        "SELECT * FROM users WHERE id = ?", [id],
        (err, result) => {
            if (err) {
                logger.error(err.message)
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            } else if (result.length === 0) {
                logger.info("User Not Found")
                res.status(404).json({
                    status: false,
                    message: "User Not Found"
                })
                return;
            } else {
                logger.info("Succes Get User By Id")
                res.status(200).json({
                    status: true,
                    message: "Succes Get User By Id",
                    data: result
                })
            }
        }
    )
}

export const createUser = async (req, res) => {
    const { error, value } = createUserValidation(req.body)
    if (error) {
        logger.error(`ERR: product - create = ${error} `)
        return res.status(400).send({
            status: false,
            message: error.details[0].message
        })
    }
    db.query(
        "INSERT INTO users (username, email, password, img) VALUES (?, ?, ?, ?)",
        [value.username, value.email, value.password, value.img],
        (err, result) => {
            if (err) {
                logger.error(err.message)
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            }
            logger.info("Succes Create User")
            res.status(201).json({
                status: true,
                message: "Succes Create User",
            })
        }
    )
}

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id)
    db.query(
        "DELETE FROM users WHERE id = ?", [id],
        (err, result) => {
            if (err) {
                logger.error(err.message)
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            }
            logger.info("Succes Delete User")
            res.status(200).json({
                status: true,
                message: "Succes Delete User",
            })
        }
    )
}