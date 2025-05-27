import { verifyToken } from '../utils/jwt.js';
// middleware
export function requireAuth(req, res, next) {
    // liest auth header aus der anfrage bearer token
    const authHeader = req.headers.authorization;
    // prüft, ob header fehlt oder nicht mit Bearer anfängt.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
        return;
    }
    // trennt bearer und JWT in zwei teile und nimmt nur den tatsächlichen JWT.
    try {
        const token = authHeader.split(' ')[1];
        // validiert den JWT.
        const decoded = verifyToken(token);
        req.user = decoded;
        // ruft die nächste middleware auf bei erfolg.
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}
//# sourceMappingURL=RequireAuth.js.map