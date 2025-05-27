import express from 'express';
import { Request, Response, Router } from 'express';
import { authenticateUser2, AuthenticationError } from './AuthenticationService.js';

// neuer Router.
const router = Router();

// GET https://localhost/api/authenticate
router.get('/authenticate', async (req: Request, res: Response):Promise<void> => {
    try {
        // 1) Header auslesen
        const authHeader: string | undefined = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            res.status(401).json({ message: 'Missing or invalid Authorization header' });
            return;
        }

        // 2) Base64-Teil extrahieren und decodieren
        const base64Credentials: string = authHeader.split(' ')[1];
        const credentials: string = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [userID, password] = credentials.split(':');

        // 3) Service aufrufen
        const token = await authenticateUser2(userID, password);

        // schreibt das JWT in den res header
        res.setHeader('Authorization', `Bearer ${token}`);

        // 4) Response
        // antwortet den client mit den user daten.
        res.status(200).json({ message: 'User authenticated!' });

    } catch (err: any) {
        if (err instanceof AuthenticationError) {
            res.status(401).json({ message: err.message });
        } else {
            console.error(err);
            res.status(500).json({ message: 'Interner Serverfehler' });
        }
    }
});

//exportiert Router als standard export.
export default router;
