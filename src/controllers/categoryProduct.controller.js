import { logger } from "../Utils/logger.js"
import { service } from "../services/service.js"


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