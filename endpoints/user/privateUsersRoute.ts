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
    deleteUserService,
    createUserService
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

// POST /api/users -> Admin ist der einzige der neue Nutzer anlegen darf
privateUserRouter.post('/', requireAdmin, async (req, res): Promise<void> => {
    try {
        const { userID, password, firstName, lastName, isAdministrator } = req.body;
        const user = await createUserService({userID, password, firstName, lastName, isAdministrator});
        res.status(201).json(user); // ohne Passwort.
    } catch (error: any) {
        if (error.message === 'UserAlreadyExists') {
            res.status(409).json({ error: 'UserAlreadyExists' });
        } else {
            res.status(500).json({ error: 'internalServerError' });
        }
    }
});

// PUT /api/users/:userID -> Admin oder sich selbst.
privateUserRouter.put('/:userID', requireSelfOrAdmin, async (req, res): Promise<void> => {
    try {
        const { firstName, lastName } = req.body;

        // existierenden nutzer abrufen
        const existingUser = await findUserByIdService(req.params.userID);
        if (!existingUser) {
            throw new Error('UserNotFound');
        }

        // abgleichen ob eine änderung stattgefunden hat um zb auch die änderung von userID abzufangen
        if (
            (firstName === undefined || existingUser.firstName === firstName) &&
            (lastName === undefined || existingUser.lastName === lastName)
        ) {
            res.status(200).json({
                message: 'No changes applied.',
            });
        }

        // ruft user service update user auf.
        const updatedUser = await updateUserService(req.params.userID, { firstName, lastName });
        res.status(200).json({ message: 'User updated.', ...updatedUser });
    } catch (error: any) {
        if ( error.message === 'UserNotFound') {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: 'internalServerError' });
        }
    }
});

// DELETE /api/users/:userID -> Nur Admin
privateUserRouter.delete('/:userID', requireAdmin, async (req, res): Promise<void> => {
    // ruft user service delete user auf.
    await deleteUserService(req.params.userID);
    res.status(204).send();
});
