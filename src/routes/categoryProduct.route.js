import { Router } from "express";
import { getAllCategoryProduct } from "../controllers/categoryProduct.controller.js";

export const CategoryProductRouter = Router();

CategoryProductRouter.get('/', getAllCategoryProduct)

