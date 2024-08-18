import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = await knex('user').where({ email }).first();
    if (existingUser) {
      return res.status(400).json('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await knex('user').insert({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json('User registered successfully');

  } catch (e) {
    console.log('Error registering user', e);
    res.status(500).json('Error registering user');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await knex('user').where({ email }).first();
    if (!user) {
      return res.status(400).json('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.json({ token, id: user.id });

  } catch (e) {
    console.log('Error logging in user', e);
    res.status(500).json('Error logging in user');
  }
};

const logout = (req, res) => {
  res.status(200).send('Logged out successfully');
};

export { signup, login, logout }