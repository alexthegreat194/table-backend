/* app/server.ts */
import "reflect-metadata"

// Import everything from express and assign it to the express variable
import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/db';
dotenv.config()

import {userRouter} from './routes/user';

db.initialize().then(async () => {
    const app: express.Application = express();
    const port: number = parseInt(process.env.PORT!) || 3000;

    app.use('/', userRouter);

    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`);
    });

}).catch(err => console.log(err))