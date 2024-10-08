import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router
    .route('/')
    .get(userController.userList)
    .post(userController.createUser)

export default router;