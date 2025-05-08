// endpoints/user/privateUsersRoute.ts
import express from 'express';
import { requireAuth } from '../middleware/RequireAuth.js';
import { requireAdmin } from '../middleware/RequireAdmin.js';
import { requireSelfOrAdmin } from '../middleware/RequireSelfOrAdmin.js';
import {
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserService
} from './UserService.js';

export const privateUserRouter = express.Router();

privateUserRouter.use(requireAuth);

// ✅ 1. GET /api/users → Admins sehen alle
privateUserRouter.get('/', requireAdmin, async (req, res) => {
    const users = await findAllUsersService();
    res.status(200).json(users);
});

// ✅ 2. GET /api/users/:userID → Admin oder sich selbst
privateUserRouter.get('/:userID', requireSelfOrAdmin, async (req, res) => {
    const user = await findUserByIdService(req.params.userID);
    res.status(200).json(user); // ohne Passwort
});

// ✅ 3. PUT /api/users/:userID → Admin oder sich selbst (aber nur name-Felder)
privateUserRouter.put('/:userID', requireSelfOrAdmin, async (req, res) => {
    const { firstName, lastName } = req.body;
    const updatedUser = await updateUserService(req.params.userID, { firstName, lastName });
    res.status(200).json({ message: 'User updated.', user: updatedUser });
});

// ✅ 4. DELETE /api/users/:userID → Nur Admin
privateUserRouter.delete('/:userID', requireAdmin, async (req, res) => {
    await deleteUserService(req.params.userID);
    res.status(204).send();
});
