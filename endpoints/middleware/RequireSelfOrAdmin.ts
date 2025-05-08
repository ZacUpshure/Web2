// middleware/requireSelfOrAdmin.ts
import { Request, Response, NextFunction } from 'express';

export const requireSelfOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const requesterID = req.user?.userID;
    const targetID = req.params.userID;

    if (requesterID === targetID || req.user?.isAdministrator) {
        return next();
    }

    res.status(403).json({ message: 'Forbidden – Not your resource or not an admin' });
};
