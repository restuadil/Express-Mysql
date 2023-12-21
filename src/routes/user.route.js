import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById } from "../controllers/user.controller.js";

export const UserRouter = Router();

UserRouter.get('/', getAllUsers)
UserRouter.get('/:id', getUserById)
UserRouter.post('/', createUser)
UserRouter.delete('/:id', deleteUser)
