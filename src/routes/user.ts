import { Router, Request, Response } from 'express';
import { db } from '../db/db';
import { User } from '../entity/user';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const users = await db.manager.find(User);
    return res.json(users);
});

router.get('/:email', (req: Request, res: Response) => {
    let { email } = req.params;

    const user = new User();
    user.email = email;
    db.manager.save(user);

    return res.redirect('/');
});

export const userRouter: Router = router;