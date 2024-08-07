import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import projectRoute from './routes/projectRoute.js';
import authRoute from './routes/authRoute.js';

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoints
// app.use('/projects', projectRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});