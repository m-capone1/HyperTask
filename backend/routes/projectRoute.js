import express from "express";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

router
    .route('/')
    .get(projectController.list)

export default router;