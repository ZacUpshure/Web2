import { UserModel } from '../user/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
export const authenticateUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userID, password] = credentials.split(':');
    const user = await UserModel.findOne({ userID });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ userID: user.userID, isAdministrator: user.isAdministrator });
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        userID: user.userID,
        isAdministrator: user.isAdministrator,
        firstName: user.firstName,
        lastName: user.lastName
    });
};
//# sourceMappingURL=AuthenticationService.js.map