"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* app/server.ts */
require("reflect-metadata");
// Import everything from express and assign it to the express variable
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
dotenv_1.default.config();
const user_1 = require("./routes/user");
db_1.db.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const port = parseInt(process.env.PORT) || 3000;
    app.use('/', user_1.userRouter);
    app.get('/', (req, res) => {
        return res.send('Hello World!');
    });
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`);
    });
})).catch(err => console.log(err));
