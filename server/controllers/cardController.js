import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const allCardList = async (req, res) => {
  try {
    const data = await knex("card");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving card data: ${err}`);
  }
};

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
    const projectId = parseInt(req.params.projectId, 10); // Ensure it's a number
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


export { allCardList, singleCard, createCard, cardsByProjectId };