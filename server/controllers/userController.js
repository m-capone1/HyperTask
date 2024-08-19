import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const userList = async (req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving user data: ${err}`);
  }
};

const createUser = async (req, res) => {
  if (
    !req.body
  ) {
    return res.status(400).json({ message: "Please ensure that all required fields are filled out." });
  }

  try {
    const result = await knex("user").insert(req.body);
    const createdUser = await knex("user").where({ id: result[0] });

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create project" });
  }
}

export { userList, createUser};