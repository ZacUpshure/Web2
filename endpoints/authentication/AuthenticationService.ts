import { Request, Response } from 'express';
import { UserModel } from '../user/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

export const authenticateUser = async (req: Request, res: Response) => {
    // ruft den wert von http header ab für authorization (kann undefined sein).
    const authHeader: string | undefined = req.headers.authorization;

    // prüft ob der header fehlt oder nicht mit basic anfängt.
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    // trennt basic und (base64 teil) und nimmt dann den zweiten teil (base64).
    const base64Credentials: string = authHeader.split(' ')[1];
    // base64 zu ascii
    const credentials: string = Buffer.from(base64Credentials, 'base64').toString('ascii');
    // trennt den String an ":", "userID:password".
    const [userID, password] = credentials.split(':');

    // fragt mongoDB ob es einen User gibt mit der angegebenen userID.
    const user = await UserModel.findOne({ userID });
    // wenn nicht:
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // vergleicht das password aus dem input mit dem hash aus der DB.
    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    // wenn nicht übereinstimmend, dann 401.
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // erstellt JWT
    const token: string = generateToken({ userID: user.userID, isAdministrator: user.isAdministrator });

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
