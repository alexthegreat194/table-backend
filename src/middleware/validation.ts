
import exp from 'constants';
import { Request, Response, NextFunction } from 'express';

const validateBodyParams = (params: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const missingParams = params.filter(param => !req.body[param]);
        if (missingParams.length) {
            return res.status(400).send(`Missing body parameters: ${missingParams.join(', ')}`);
        }
        next();
    }
}

export { validateBodyParams };