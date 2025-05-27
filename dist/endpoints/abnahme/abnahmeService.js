import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import { UserModel } from "../user/UserModel.js";
export const getAdmins = async (req, res) => {
    //AUTH
    // ruft authorization von http header ab.
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
    //GET ALL ADMINS
    // aufruf UserModel um alle einträge abzurufen.
    const users = await UserModel.find({ isAdministrator: true });
    // antwortet den client mit den user daten.
    // user in einer Liste wiedergeben.
    return res.status(200).json(users.map(user => ({
        userID: user.userID,
        isAdministrator: user.isAdministrator,
    })));
};
//# sourceMappingURL=abnahmeService.js.map