import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const singleCard = async (req, res) => {
  try {
    const cardData = await knex.select("*").from("card").where({ id: req.params.id });

    if (cardData.length === 0) {
      return res.status(404).json({
        message: `Card with ID ${req.params.id} not found.`,
      });
    }

    const singleCard = cardData[0];

    res.json(singleCard);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve card data" });
  }
};

const createCard = async (req, res) => {
  if (
    !req.body
  ) {
    return res.status(400).json({ message: "Please ensure that all required fields are filled out." });
  }

  try {
    const result = await knex("card").insert(req.body);
    const createdCard = await knex("card").where({ id: result[0] });

    res.status(201).json(createdCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create card" });
  }
}

const cardsByProjectId = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId, 10);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const data = await knex("card").where({ project_id: projectId });

    if (data.length === 0) {
      return res.status(404).json({ message: `No cards found for project ID ${projectId}` });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(`Error retrieving card data: ${err}`);
  }
};

const toDoCardList = async (req, res) => {
  try {
    const data = await knex.select("*").from("card").where({ category: 'To Do' });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving card data: ${err}`);
  }
};

const inProgCardList = async (req, res) => {
  try {
    const data = await knex.select("*").from("card").where({ category: 'In Progress' });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving card data: ${err}`);
  }
};

const inRevCardList = async (req, res) => {
  try {
    const data = await knex.select("*").from("card").where({ category: 'In Review' });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving card data: ${err}`);
  }
};

const completedCardList = async (req, res) => {
  try {
    const data = await knex.select("*").from("card").where({ category: 'Completed' });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving card data: ${err}`);
  }
};

const updatedToDoCardList = async (req, res) => {
  try{
    const rowsUpdated = await knex("cards").where({ id: req.params.id }).update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Card with ID ${req.params.id} not found`,
      });
    }

    const updatedCard = await knex("card").where({ id: req.params.id });

    res.status(200).json(updatedCard[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory item with ID ${req.params.id}: ${error}`,
    });
  }
}


export { singleCard, createCard, cardsByProjectId, toDoCardList, inProgCardList, inRevCardList, completedCardList, updatedToDoCardList };