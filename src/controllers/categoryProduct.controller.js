import { logger } from "../Utils/logger.js"
import { service } from "../services/service.js"
import { createCategoryProductValidation, updateCategoryProductValidation } from "../validations/categoryProduct.validation.js"


export const getAllCategoryProduct = async (req, res) => {
    try {
        const result = await service("SELECT * FROM category_products")
        logger.info("Succes Get All Category Product")
        res.status(200).json({
            status: true,
            message: "Succes Get All Category Product",
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

export const getCategoryProductById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await service("SELECT * FROM category_products WHERE id = ?", [id])
        logger.info("Succes Get All Category Product")
        res.status(200).json({
            status: true,
            message: "Succes Get All Category Product",
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

export const createCategoryProduct = async (req, res) => {
    const { error, value } = createCategoryProductValidation(req.body)
    const { category } = value
    if (error) {
        logger.error(`ERR: categoryProduct - create = ${error} `)
        return res.status(400).send({ status: false, message: error.details[0].message })
    }
    try {
        const checkName = await service("SELECT * FROM category_products WHERE category = ?", [category])
        if (checkName.length > 0) return res.status(400).json({ status: false, message: "Category Already Exist" })
        await service("INSERT INTO category_products (category) VALUES (?)", [category])
        logger.info("Success Create Category Product")
        res.status(200).json({ status: true, message: "Success Create Category Product" })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({ status: false, message: error.message })
    }
}

export const updateCategoryProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    const categoryFromDB = await service("SELECT * FROM category_products WHERE id = ?", [id])
    if (categoryFromDB.length === 0) return res.status(404).json({ status: false, message: "Category Not Found" })
    const { error, value } = updateCategoryProductValidation(req.body)
    const { category } = value
    if (error) {
        logger.error(`ERR: categoryProduct - update = ${error} `)
        return res.status(400).send({ status: false, message: error.details[0].message })
    }
    try {
        const checkName = await service("SELECT * FROM category_products WHERE category = ?", [category])
        if (checkName.length > 0) return res.status(400).json({ status: false, message: "Category Already Exist" })
        await service("UPDATE category_products SET category = ? WHERE id = ?", [category, id])
        logger.info("Success Update Category Product")
        res.status(200).json({ status: true, message: "Success Update Category Product" })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({ status: false, message: error.message })
    }
}

export const deleteCategoryProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    const categoryFromDB = await service("SELECT * FROM category_products WHERE id = ?", [id])
    if (categoryFromDB.length === 0) return res.status(404).json({ status: false, message: "Category Not Found" })
    try {
        await service("DELETE FROM category_products WHERE id = ?", [id])
        logger.info("Success Delete Category Product")
        res.status(200).json({ status: true, message: "Success Delete Category Product" })
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({ status: false, message: error.message })
    }
}