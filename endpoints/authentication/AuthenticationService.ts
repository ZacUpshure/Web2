import { Request, Response } from 'express';
import { UserModel } from '../user/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export async function authenticateUser2(userID: string, password: string): Promise<string> {
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
    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    // wenn nicht übereinstimmend, dann 401.
    if (!isPasswordValid) {
        throw new AuthenticationError('Benutzername und Passwort sind erforderlich');
    }

    // 3. Erstelle und gib ein Token zurück
    const token = generateToken({ userId: user._id, isAdministrator: user.isAdministrator });

    return token;
}