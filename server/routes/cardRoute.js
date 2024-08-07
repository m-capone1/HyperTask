import express from "express";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router
    .route('/')
    .get(cardController.cardList)
    .post(cardController.createCard);

export default router;