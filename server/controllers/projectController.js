import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const projectsList = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await knex("project").where({ user_id: userId });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving project data: ${err}`);
  }
};

const singleProject = async (req, res) => {
  try {
    const projectData = await knex("project")
      .where({ id: req.params.id, user_id: req.user.id }) 
      .first();

    if (!projectData) {
      return res.status(404).json({
        message: `Project with ID ${req.params.id} not found.`,
      });
    }

    res.json(projectData);
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
    const newProject = {
      ...req.body,
      user_id: req.user.id
    };
    const result = await knex("project").insert(newProject);
    const createdProject = await knex("project").where({ id: result[0] });

    res.status(201).json(createdProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create project" });
  }
}

const deleteProject = async (req, res) => {
  try {
    const result = await knex("project")
      .where({ id: req.params.id, user_id: req.user.id })
      .del();

    if (result === 0) {
      return res.status(400).json({ message: "Project not found or not authorized to delete" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Unable to delete project" });
  }
};

const userProjectList = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await knex("project").where({ user_id: userId });

    if (data.length === 0) {
      return res.status(404).json({ message: `No projects found for user ID ${userId}` });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(`Error retrieving projects data: ${err}`);
  }
};

export { projectsList, singleProject, createProject, userProjectList, deleteProject };