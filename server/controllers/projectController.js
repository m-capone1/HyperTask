import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// List project data
const list = async (req, res) => {
  try {
    const data = await knex("projects");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving project data: ${err}`);
  }
};

export { list };