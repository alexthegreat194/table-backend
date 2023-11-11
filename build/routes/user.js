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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const user_1 = require("../entity/user");
const userRepository = db_1.db.getRepository(user_1.User);
const router = (0, express_1.Router)();
router.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.User();
    user.email = req.body.email;
    try {
        yield db_1.db.manager.save(user);
        return res.status(201).send(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Creating User" });
    }
}));
router.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    try {
        const user = yield userRepository.findOneBy({ id: parseInt(id) });
        return res.send(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Retrieving User" });
    }
}));
router.put('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email } = req.body;
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    try {
        const user = yield userRepository.findOneBy({ id: parseInt(id) });
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        user.email = email;
        yield db_1.db.manager.save(user);
        return res.send(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Updating User" });
    }
}));
router.delete('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    try {
        yield userRepository.delete({ id: parseInt(id) });
        return res.send({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Deleting User" });
    }
}));
exports.userRouter = router;
