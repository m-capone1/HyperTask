import express from "express";
import * as boardController from "../controllers/boardController.js";

const router = express.Router();

router
    .route('/')
    .get(boardController.boardList)
    .post(boardController.createBoard);

router
    .route('/:id')
    .get(boardController.singleBoard);

export default router;