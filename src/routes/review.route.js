import { Router } from "express";
import { createReview, getAllReviews } from "../controllers/review.controller.js";
import { requireUser } from "../middleware/auth.js";

export const ReviewRouter = Router();


ReviewRouter.get('/', getAllReviews)
ReviewRouter.post('/', requireUser, createReview)
