import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// List project data
const boardList = async (req, res) => {
  try {
    const data = await knex("board");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving board data: ${err}`);
  }
};

const singleBoard = async (req, res) => {
  try {
    const boardData = await knex.select("*").from("board").where({ id: req.params.id });

    if (boardData.length === 0) {
      return res.status(404).json({
        message: `Board with ID ${req.params.id} not found.`,
      });
    }

    const singleBoard = boardData[0];

    res.json(singleBoard);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve board data" });
  }
};

const createBoard = async (req, res) => {
  if (
    !req.body
  ) {
    return res.status(400).json({ message: "Please ensure that all required fields are filled out." });
  }

  try {
    const result = await knex("board").insert(req.body);
    const createdProject = await knex("board").where({ id: result[0] });

    res.status(201).json(createdProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create board" });
  }
}

export { boardList, singleBoard, createBoard };