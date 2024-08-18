import express from "express";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

router
    .route('/')
    .get(projectController.projectsList)
    .post(projectController.createProject)

router
    .route('/:id')
    .get(projectController.singleProject)
    .delete(projectController.deleteProject);

router
    .route('/user/:userId')
    .get(projectController.userProjectList)

export default router;