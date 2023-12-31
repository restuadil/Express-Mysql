import { logger } from "../Utils/logger.js"
import { service } from "../services/service.js"
import { createProductValidation, updateProductValidation } from "../validations/product.validation.js";

export const getAllProducts = async (req, res) => {
    const { category, page = 1, price, s } = req.query;

    try {
        let query = `
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
                category_products cp ON p.category_id = cp.id
        `;

        const queryParams = [];

        if (category) {
            query += ` WHERE cp.category = ?`;
            queryParams.push(category);
        }

        if (price) {
            query += ` ORDER BY p.price ${price.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`;
        }

        if (s) {
            query += ` AND p.name LIKE ?`;
            queryParams.push(`%${s}%`);
        }

        const limit = 10;
        const offset = (parseInt(page) - 1) * limit;
        query += ` LIMIT ?, ?`;
        queryParams.push(offset, limit);

        const result = await service(query, queryParams);

        res.status(200).json({
            status: true,
            message: "Success Get All Products",
            pagination: {
                page: parseInt(page),
                total: result.length,
            },
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};



export const getProductById = async (req, res) => {
    const id = parseInt(req.params.id)
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
                category_products cp ON p.category_id = cp.id
            WHERE  p.id = ?;
        `, [id])

        if (result.length === 0) return res.status(404).json({ status: false, message: "Product Not Found" })

        logger.info("Succes Get Product")

        res.status(200).json({ status: true, message: "Succes Get Product", data: result })

    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const createProduct = async (req, res) => {
    const { error, value } = createProductValidation(req.body);
    const { name, category_id, information, price, img, status } = value

    if (error) {
        logger.error(`ERR: product - create = ${error} `);
        return res.status(400).send({ status: false, message: error.details[0].message });
    }

    try {

        const checkName = await service("SELECT * FROM products WHERE name = ?", [name]);
        const checkCategoryProduct = await service("SELECT * FROM category_products WHERE id = ?", [category_id]);

        if (checkCategoryProduct.length === 0) return res.status(400).json({ status: false, message: "Category Not Found" });
        if (checkName.length > 0) return res.status(400).json({ status: false, message: "Name Already Exist" });

        await service("INSERT INTO products (name, category_id, information, price, img, status) VALUES (?, ?, ?, ?, ?, ?)", [name, category_id, information, price, img, status]);

        logger.info("Success Create Product");
        res.status(201).json({ status: true, message: "Success Create Product" });

    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    const productFromDB = await service("SELECT * FROM products WHERE id = ?", [id]);
    if (productFromDB.length === 0) return res.status(404).json({ status: false, message: "Product Not Found" });

    const { error, value } = updateProductValidation(req.body);
    const { name, category_id, information, price, img, status } = value
    if (error) {
        logger.error(`ERR: product - update = ${error} `);
        return res.status(400).send({ status: false, message: error.details[0].message });
    }
    try {
        const checkName = await service("SELECT * FROM products WHERE name = ?", [name]);
        if (checkName.length > 0) return res.status(400).json({ status: false, message: "Name Already Exist" });
        await service("UPDATE products SET name = ?, category_id = ?, information = ?, price = ?, img = ?, status = ? WHERE id = ?", [name, parseInt(category_id), information, parseInt(price), img, status, id]);
        logger.info("Success Update Product");
        res.status(200).json({ status: true, message: "Success Update Product" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    const productFromDB = await service("SELECT * FROM products WHERE id = ?", [id]);
    if (productFromDB.length === 0) return res.status(404).json({ status: false, message: "Product Not Found" });
    try {
        await service("DELETE FROM products WHERE id = ?", [id]);
        logger.info("Success Delete Product");
        res.status(200).json({ status: true, message: "Success Delete Product" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}