import { Router } from "express";
import { createCategoryProduct, deleteCategoryProduct, getAllCategoryProduct, getCategoryProductById, updateCategoryProduct } from "../controllers/categoryProduct.controller.js";
import { requireUser } from "../middleware/auth.js";

export const CategoryProductRouter = Router();

CategoryProductRouter.get('/', getAllCategoryProduct)
CategoryProductRouter.get('/:id', getCategoryProductById)
CategoryProductRouter.post('/', requireUser, createCategoryProduct)
CategoryProductRouter.delete('/:id', requireUser, deleteCategoryProduct)
CategoryProductRouter.put('/:id', requireUser, updateCategoryProduct)

