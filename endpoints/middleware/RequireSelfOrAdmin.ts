import { Request, Response, NextFunction } from 'express';

export const requireSelfOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const requesterID = req.user?.userID;
    const targetID = req.params.userID;

    if (requesterID === targetID || req.user?.isAdministrator) {
        return next();
    }

    console.log('req.user.userID:', req.user?.userID);
    console.log('req.params.userID:', req.params.userID);

    res.status(403).json({ message: 'Forbidden – Not your resource or not an admin' });
};
