import { logger } from "../Utils/logger.js"
import { service } from "../services/service.js"
import { createReviewValidation, updateReviewValidation } from "../validations/review.validation.js"

export const getAllReviews = async (req, res) => {
    try {
        const result = await service("SELECT * FROM reviews")
        logger.info("Succes Get All Reviews")
        res.status(200).json({
            status: true,
            message: "Succes Get All Reviews",
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
export const getReviewById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await service("SELECT * FROM reviews WHERE id = ?", [id])
        if (result.length === 0) return res.status(400).json({ status: false, message: "Review Not Found" })
        logger.info("Succes Get All Reviews")
        res.status(200).json({
            status: true,
            message: "Succes Get All Reviews",
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

export const createReview = async (req, res) => {
    try {
        const { error, value } = createReviewValidation(req.body)
        if (error) return res.status(400).send({ status: false, message: error.details[0].message })
        const { product_id, user_id, review } = value


        const checkProduct = await service("SELECT * FROM products WHERE id = ?", [product_id])
        const checkUser = await service("SELECT * FROM users WHERE id = ?", [user_id])
        if (checkProduct.length === 0) return res.status(400).json({ status: false, message: "Product Not Found" })
        if (checkUser.length === 0) return res.status(400).json({ status: false, message: "User Not Found" })


        await service("INSERT INTO reviews (product_id, user_id, review) VALUES (?, ?, ?)", [product_id, user_id, review])
        logger.info("Success Create Review")
        res.status(200).json({
            status: true,
            message: "Success Create Review"
        })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


export const updateReview = async (req, res) => {
    const id = parseInt(req.params.id)
    const reviewFromDB = await service("SELECT * FROM reviews WHERE id = ?", [id])
    if (reviewFromDB.length === 0) return res.status(404).json({ status: false, message: "Review Not Found" })
    try {
        const { error, value } = updateReviewValidation(req.body)
        if (error) return res.status(400).send({ status: false, message: error.details[0].message })
        const { product_id, user_id, review } = value
        await service("UPDATE reviews SET product_id = ?, user_id = ?, review = ? WHERE id = ?", [product_id, user_id, review, id])
        logger.info("Success Update Review")
        res.status(200).json({
            status: true,
            message: "Success Update Review"
        })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const deleteReview = async (req, res) => {
    const id = parseInt(req.params.id)
    const reviewFromDB = await service("SELECT * FROM reviews WHERE id = ?", [id])
    if (reviewFromDB.length === 0) return res.status(404).json({ status: false, message: "Review Not Found" })
    try {
        await service("DELETE FROM reviews WHERE id = ?", [id])
        logger.info("Success Delete Review")
        res.status(200).json({
            status: true,
            message: "Success Delete Review"
        })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}