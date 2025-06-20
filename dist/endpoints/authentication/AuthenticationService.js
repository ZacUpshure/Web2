import { UserModel } from '../user/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
export const authenticateUser = async (req, res) => {
    // ruft den wert von http header ab für authorization (kann undefined sein).
    const authHeader = req.headers.authorization;
    // prüft ob der header fehlt oder nicht mit basic anfängt.
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    // trennt basic und (base64 teil) und nimmt dann den zweiten teil (base64).
    const base64Credentials = authHeader.split(' ')[1];
    // base64 zu ascii
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    // trennt den String an ":", "userID:password".
    const [userID, password] = credentials.split(':');
    // fragt mongoDB ob es einen User gibt mit der angegebenen userID.
    const user = await UserModel.findOne({ userID });
    // wenn nicht:
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // vergleicht das password aus dem input mit dem hash aus der DB.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // wenn nicht übereinstimmend, dann 401.
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // erstellt JWT
    const token = generateToken({ id: user._id, isAdministrator: user.isAdministrator });
    // schreibt das JWT in den res header
    res.setHeader('Authorization', `Bearer ${token}`);
    // antwortet den client mit den user daten.
    return res.status(200).json({
        userID: user.userID,
        isAdministrator: user.isAdministrator,
        firstName: user.firstName,
        lastName: user.lastName
    });
};
export async function authenticateUser2(userID, password) {
    // 1. Validierung der Eingaben
    if (!userID || !password) {
        throw new AuthenticationError('Benutzername und Passwort sind erforderlich');
    }
    // 2) User aus der DB holen
    const user = await UserModel.findOne({ userID });
    if (!user) {
        // keine Details verraten, damit man nicht herausfinden kann, ob nur der Username falsch war
        throw new AuthenticationError('Ungültige Anmeldeinformationen');
    }
    // 2. Prüfe Credentials (z.B. gegen Datenbank)
    // vergleicht das password aus dem input mit dem hash aus der DB.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // wenn nicht übereinstimmend, dann 401.
    if (!isPasswordValid) {
        throw new AuthenticationError('Benutzername und Passwort sind erforderlich');
    }
    // 3. Erstelle und gib ein Token zurück
    const token = generateToken({ userId: user._id, isAdministrator: user.isAdministrator });
    return token;
}
//# sourceMappingURL=AuthenticationService.js.map