import express from 'express';
import {Router, Request, Response} from 'express';
import { getAdmins } from '../abnahme/abnahmeService.js';

// neuer Router
const router: Router = express.Router();

// getAdmins
router.get('/getAdmins', (req: Request, res: Response): void => {
    getAdmins(req, res);// req und res dürfen im service nicht auftauchen
});

export default router;