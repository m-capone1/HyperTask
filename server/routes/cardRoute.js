import express from "express";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router
    .route('/:id')
    .get(cardController.singleCard)
    .put(cardController.updateCard);

router
    .route('/cards/:projectId')
    .get(cardController.cardsByProjectId)
    .post(cardController.createCard);

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