import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// List project data
const projectsList = async (req, res) => {
  try {
    const data = await knex("project");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving project data: ${err}`);
  }
};

const singleProject = async (req, res) => {
  try {
    const projectData = await knex.select("*").from("project").where({ id: req.params.id });

    if (projectData.length === 0) {
      return res.status(404).json({
        message: `Project with ID ${req.params.id} not found.`,
      });
    }

    const singleProject = projectData[0];

    res.json(singleProject);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve project data" });
  }
};

const createProject = async (req, res) => {
  if (
    !req.body
  ) {
    return res.status(400).json({ message: "Please ensure that all required fields are filled out." });
  }

  try {
    const result = await knex("project").insert(req.body);
    const createdProject = await knex("project").where({ id: result[0] });

    res.status(201).json(createdProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create project" });
  }
}

export { projectsList, singleProject, createProject };