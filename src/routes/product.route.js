import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { requireUser } from "../middleware/auth.js";

export const ProductRouter = Router();
ProductRouter.get('/', getAllProducts)
ProductRouter.get('/:id', getProductById)
ProductRouter.post('/', requireUser, createProduct)
ProductRouter.put('/:id', requireUser, updateProduct)
ProductRouter.delete('/:id', requireUser, deleteProduct)

