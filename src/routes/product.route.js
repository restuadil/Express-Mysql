import { Router } from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/product.controller.js";

export const ProductRouter = Router();

ProductRouter.get('/', getAllProducts)
ProductRouter.get('/:id', getProductById)
ProductRouter.post('/', createProduct)
