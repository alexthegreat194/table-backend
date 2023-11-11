import { Router, Request, Response } from 'express';

import prisma from '../db/prisma';
import { validateBodyParams } from '../middleware/validation';

const router: Router = Router();

router.post('/user', validateBodyParams(['email']), async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await prisma.user.create({
        data: {
            email
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send({ message: "Error Creating User" });
    });
    return res.status(201).send(user);
});

router.get('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }
    return res.status(200).send(user);
});

router.put('/user/:id', validateBodyParams, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email } = req.body;

    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }

    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            email
        }
    })
});

router.delete('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    await prisma.user.delete({
        where: {
            id: id
        }
    }).catch(err => {
        console.log(err);
        return res.status(500).send({ message: "Error deleting user" });
    });
    return res.status(200).send({ message: "User deleted" });
});

export const userRouter: Router = router;