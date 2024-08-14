import express from "express";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router
    .route('/:id')
    .get(cardController.singleCard)
    .put(cardController.updateCard)
    .delete(cardController.deleteCard);

router
    .route('/cards/:projectId')
    .get(cardController.cardsByProjectId)
    .post(cardController.createCard);

export default router;