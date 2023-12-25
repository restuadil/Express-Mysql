import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import { requireUser } from "../middleware/auth.js";

export const UserRouter = Router();

UserRouter.get('/', getAllUsers)
UserRouter.get('/:id', getUserById)
UserRouter.delete('/:id', requireUser, deleteUser)
UserRouter.put('/:id', requireUser, updateUser)
