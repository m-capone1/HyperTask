import express from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';
import cors from 'cors';

import projectRoute from './routes/projectRoute.js';
import openaiRoute from './routes/openaiRoute.js';
import authRoutes from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import cardRoute from './routes/cardRoute.js';

//addd env variables
const app = express();
const port = 8080;

//middleware
app.use(bodyParser.json());
app.use(cors());

//endpoints
app.use('/project', projectRoute);
app.use('/openai', openaiRoute);
app.use('/', authRoutes)
app.use('/user', userRoute);
app.use('/card', cardRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});