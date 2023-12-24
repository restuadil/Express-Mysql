import { Router } from "express";
import { getAllProducts, getProductById } from "../controllers/product.controller.js";

export const ProductRouter = Router();

ProductRouter.get('/', getAllProducts)
ProductRouter.get('/:id', getProductById)

