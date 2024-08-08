import express from "express";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router
    .route('/')
    .get(cardController.allCardList)
    .post(cardController.createCard);

router
    .route('/:id')
    .get(cardController.singleCard);

router
    .route('/cards/:projectId')
    .get(cardController.cardsByProjectId);

export default router;