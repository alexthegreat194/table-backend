import { Router, Request, Response } from 'express';
import { db } from '../db/db';
import { User } from '../entity/user';
import { parse } from 'path';

const userRepository = db.getRepository(User);
const router: Router = Router();

router.post('/user', async (req: Request, res: Response) => {
    const user = new User();
    user.email = req.body.email;

    try {
        await db.manager.save(user);
        return res.status(201).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Creating User" });
    }
});

router.get('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }

    try {
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Retrieving User" });
    }
});

router.put('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email } = req.body;

    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }

    try {
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        user.email = email;
        await db.manager.save(user);
        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Updating User" });
    }
});

router.delete('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send("Missing URL parameter: id");
    }

    try {
        await userRepository.delete({ id: parseInt(id) });
        return res.send({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Deleting User" });
    }
});

export const userRouter: Router = router;