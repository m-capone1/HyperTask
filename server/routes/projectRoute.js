import express from "express";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

router
    .route('/')
    .get(projectController.projectsList)
    .post(projectController.createProject);

router
    .route('/:id')
    .get(projectController.singleProject)

export default router;