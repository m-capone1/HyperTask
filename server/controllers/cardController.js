import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const singleCard = async (req, res) => {
  try {
    const cardData = await knex("card").where({ id: req.params.id }).first();

    if (!cardData) {
      return res.status(404).json({
        message: `Card with ID ${req.params.id} not found or not accessible.`,
      });
    }

    res.json(cardData);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve card data" });
  }
};

const createCard = async (req, res) => {
  const { project_id, title, description } = req.body;
  
  if (!project_id || !title || !description) {
    return res.status(400).json({ message: "Please ensure that all required fields are filled out." });
  }

  try {
    const result = await knex("card").insert({ ...req.body });
    const createdCard = await knex("card").where({ id: result[0] }).first();

    res.status(201).json(createdCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create card" });
  }
};

const cardsByProjectId = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId, 10);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const data = await knex("card").where({ project_id: projectId });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(`Error retrieving card data: ${err}`);
  }
};

const updateCard = async (req, res) => {
  try {
    const rowsUpdated = await knex("card").where({ id: req.params.id}).update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Card with ID ${req.params.id} not found or not accessible.`,
      });
    }

    const updatedCard = await knex("card").where({ id: req.params.id }).first();

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update card with ID ${req.params.id}: ${error}`,
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    const result = await knex("card").where({ id: req.params.id }).del();

    if (result === 0) {
      return res.status(404).json({ message: "Card not found or not accessible, so could not delete" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Unable to delete card" });
  }
};

export { singleCard, createCard, cardsByProjectId, updateCard, deleteCard };