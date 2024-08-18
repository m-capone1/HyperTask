import express from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';
import cors from 'cors';
import authenticate from './middleware/middleware.js';
import 'dotenv/config';

import projectRoute from './routes/projectRoute.js';
import openaiRoute from './routes/openaiRoute.js';
import authRoutes from './routes/authRoute.js';
// import userRoute from './routes/userRoute.js';
import cardRoute from './routes/cardRoute.js';

const app = express();
const port = 8080;

app.use(cors());

app.use(bodyParser.json());

app.use('/project', authenticate, projectRoute);
app.use('/openai', openaiRoute);
app.use('/auth', authRoutes)
// app.use('/user', userRoute);
app.use('/card', authenticate, cardRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});