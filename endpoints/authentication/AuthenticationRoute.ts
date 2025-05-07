import express from 'express';
import { Request, Response } from 'express';
import { authenticateUser } from './AuthenticationService.js';

const router = express.Router();

router.get('/authenticate', (req: Request, res: Response) => {
    authenticateUser(req, res);
});

export default router;
