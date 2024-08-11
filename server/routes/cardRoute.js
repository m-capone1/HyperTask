import express from "express";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router
    .route('/')
    .post(cardController.createCard);

router
    .route('/:id')
    .get(cardController.singleCard);

router
    .route('/cards/:projectId')
    .get(cardController.cardsByProjectId);

router 
    .route('/:projectId/todo')
    .get(cardController.toDoCardList)

router 
    .route('/:projectId/inprogress')
    .get(cardController.inProgCardList)

router 
    .route('/:projectId/inreview')
    .get(cardController.inRevCardList)

router 
    .route('/:projectId/completed')
    .get(cardController.completedCardList)

export default router;