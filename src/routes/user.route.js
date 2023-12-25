import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";

export const UserRouter = Router();

UserRouter.get('/', getAllUsers)
UserRouter.get('/:id', getUserById)
UserRouter.delete('/:id', deleteUser)
UserRouter.put('/:id', updateUser)
