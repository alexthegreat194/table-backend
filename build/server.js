"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* app/server.ts */
require("reflect-metadata");
// Import everything from express and assign it to the express variable
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = require("./routes/user");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT) || 3000;
app.use('/', user_1.userRouter);
app.get('/', (req, res) => {
    return res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
