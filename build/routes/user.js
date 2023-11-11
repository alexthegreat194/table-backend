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
exports.userRouter = void 0;
const express_1 = require("express");
const prisma_1 = __importDefault(require("../db/prisma"));
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/user', (0, validation_1.validateBodyParams)(['email']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield prisma_1.default.user.create({
        data: {
            email
        }
    })
        .catch(err => {
        console.log(err);
        return res.status(500).send({ message: "Error Creating User" });
    });
    return res.status(201).send(user);
}));
router.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: id
        }
    });
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }
    return res.status(200).send(user);
}));
router.put('/user/:id', validation_1.validateBodyParams, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email } = req.body;
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    yield prisma_1.default.user.update({
        where: {
            id: id
        },
        data: {
            email
        }
    });
}));
router.delete('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    yield prisma_1.default.user.delete({
        where: {
            id: id
        }
    }).catch(err => {
        console.log(err);
        return res.status(500).send({ message: "Error deleting user" });
    });
    return res.status(200).send({ message: "User deleted" });
}));
exports.userRouter = router;
