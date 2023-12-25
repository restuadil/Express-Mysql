import { Router } from "express";
import { createCategoryProduct, getAllCategoryProduct, getCategoryProductById } from "../controllers/categoryProduct.controller.js";

export const CategoryProductRouter = Router();

CategoryProductRouter.get('/', getAllCategoryProduct)
CategoryProductRouter.get('/:id', getCategoryProductById)
CategoryProductRouter.post('/', createCategoryProduct)

