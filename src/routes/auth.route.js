import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

export const AuthRouter = Router();

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)

