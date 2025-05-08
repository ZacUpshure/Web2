import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user?.isAdministrator) {
        res.status(403).json({ message: 'Admin privileges required' });
        return;
    }
    next();
};
