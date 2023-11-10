"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    return res.send('Hello, World!');
});
router.get('/:name', (req, res) => {
    let { name } = req.params;
    return res.send(`Hello, ${name}`);
});
exports.userRouter = router;
