import { Router } from "express";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/review.controller.js";
import { requireUser } from "../middleware/auth.js";

export const ReviewRouter = Router();


ReviewRouter.get('/', getAllReviews)
ReviewRouter.get('/:id', getReviewById)
ReviewRouter.post('/', requireUser, createReview)
ReviewRouter.put('/:id', requireUser, updateReview)
ReviewRouter.post('/:id', requireUser, deleteReview)
