import express from 'express';
import {
    createUserService,
    deleteUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService
} from '../user/UserService';

export const userRouter = express.Router();

// CREATE
userRouter.post('/', async (req, res) => {
    try {
        const { userID, firstName, lastName, isAdministrator, password } = req.body;

        if (!userID || !password) {
            res.status(400).json({ message: 'userID and password are required.' });
            return;
        }

        const createdUser = await createUserService({
            userID,
            firstName,
            lastName,
            isAdministrator,
            password
        });

        res.status(201).json({ message: 'User created successfully.', user: createdUser });
    } catch (error: any) {
        if (error.message === 'UserAlreadyExists') {
            res.status(409).json({ message: 'User already exists.' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// READ ALL
userRouter.get('/', async (_req, res) => {
    try {
        const users = await findAllUsersService();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// READ BY ID
userRouter.get('/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID, 10);
        const user = await findUserByIdService(userID);
        res.status(200).json({ user });
    } catch (error: any) {
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// UPDATE
userRouter.put('/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID, 10);
        const updatedUser = await updateUserService(userID, req.body);
        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error: any) {
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// DELETE
userRouter.delete('/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID, 10);
        const deletedUser = await deleteUserService(userID);
        res.status(200).json({ message: 'User deleted successfully.', user: deletedUser });
    } catch (error: any) {
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});
