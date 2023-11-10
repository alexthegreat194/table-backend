/* app/server.ts */

// Import everything from express and assign it to the express variable
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

import {userRouter} from './routes/user';

const app: express.Application = express();
const port: number = parseInt(process.env.PORT!) || 3000;

app.use('/', userRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});