// endpoints/user/privateUsersRoute.ts
import {Router} from 'express';
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

// erstellt Router
export const privateUserRouter: Router = express.Router();

// nutzt require auth middleware
privateUserRouter.use(requireAuth);

// GET /api/users -> Admins sehen alle
privateUserRouter.get('/', requireAdmin, async (req, res): Promise<void> => {
    // ruft user service find all users auf.
    const users = await findAllUsersService();
    res.status(200).json(users);
});

// GET /api/users/:userID -> Admin oder sich selbst
privateUserRouter.get('/:userID', requireSelfOrAdmin, async (req, res): Promise<void> => {
    const userID = req.params.userID;
    // ruft user service find user by id mit entsprechender user id auf.
    const user = await findUserByIdService(userID);
    res.status(200).json(user); // ohne Passwort.
});

// PUT /api/users/:userID -> Admin oder sich selbst.
privateUserRouter.put('/:userID', requireSelfOrAdmin, async (req, res): Promise<void> => {
    const { firstName, lastName } = req.body;
    // ruft user service update user auf.
    const updatedUser = await updateUserService(req.params.userID, { firstName, lastName });
    res.status(200).json({ message: 'User updated.', user: updatedUser });
});

// DELETE /api/users/:userID -> Nur Admin
privateUserRouter.delete('/:userID', requireAdmin, async (req, res): Promise<void> => {
    // ruft user service delete user auf.
    await deleteUserService(req.params.userID);
    res.status(204).send();
});
