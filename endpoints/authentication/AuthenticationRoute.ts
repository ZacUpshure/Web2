import express from 'express';
import { Request, Response, Router } from 'express';
import { authenticateUser } from './AuthenticationService.js';

// neuer Router.
const router: Router = express.Router();

// definiert Route -> GET http://localhost:80/api/authenticate.
router.get('/authenticate', (req: Request, res: Response): void => {
    authenticateUser(req, res);     // leitet den Request direkt an service funktion weiter.
});

//exportiert Router als standard export.
export default router;
