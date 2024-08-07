import express from "express";
import * as projectController from "../controller/projectController";

const router = express.Router();

router
    .route('/')
    .get(projectController.list)

export default router;
