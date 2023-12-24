import { logger } from "../Utils/logger.js"
import { service } from "../services/service.js"

export const getAllProducts = async (req, res) => {
    try {
        const result = await service(`
            SELECT
                p.id,
                p.name,
                cp.category,
                p.information,
                p.price,
                p.status,
                p.img,
                p.created_at,
                p.updated_at
            FROM
                products p
            INNER JOIN
                category_products cp ON p.category_id = cp.id;
        `);
        logger.info("Success Get All Products");
        res.status(200).json({
            status: true,
            message: "Success Get All Products",
            data: result
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await service("SELECT * FROM products WHERE id = ?", [id])
        if (result.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Product Not Found"
            })
        }
        logger.info("Succes Get Product")
        res.status(200).json({
            status: true,
            message: "Succes Get Product",
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

export const createProduct = async (req, res) => {

}