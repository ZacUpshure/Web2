import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { UserTokenPayload } from '../../types/AuthTypes.js';

// middleware
export function requireAuth(req: Request, res: Response, next: NextFunction): void {

    // liest auth header aus der anfrage bearer token
    const authHeader: string | undefined = req.headers.authorization;

    // prüft, ob header fehlt oder nicht mit Bearer anfängt.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
        return;
    }

    // trennt bearer und JWT in zwei teile und nimmt nur den tatsächlichen JWT.
    try {
        const token: string = authHeader.split(' ')[1];
        // validiert den JWT.
        const decoded = verifyToken(token) as UserTokenPayload;
        req.user = decoded;
        // ruft die nächste middleware auf bei erfolg.
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}
