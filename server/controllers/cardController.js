import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const cardList = async (req, res) => {
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

export { cardList, singleCard, createCard };