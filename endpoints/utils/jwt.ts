import jwt from 'jsonwebtoken';
import {JwtPayload} from "jsonwebtoken";

const SECRET_KEY: string = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken: (payload: object)=> string = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken: (token: string) => string | JwtPayload = (token: string): string | JwtPayload => {
    return jwt.verify(token, SECRET_KEY);
};


