import express from "express";
import {Request, Response} from 'express';
import { Server } from 'http';
import mongoose from "mongoose";
import { createUserService } from "./endpoints/user/UserService";
import { findUserByIdService } from './endpoints/user/UserService';
import { findAllUsersService } from './endpoints/user/UserService';
import { updateUserService } from './endpoints/user/UserService';
import { deleteUserService } from './endpoints/user/UserService';


const app: any = express();
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World, this is a change. And another one.')
})

// create
app.post('/api/publicUsers', async (req: Request, res: Response): Promise<void> => {
    try {
        const { userID, firstName, lastName, isAdministrator, password } = req.body;

        // Grundlegende Validierung (optional verbessern mit Zod, Joi etc.)
        if (!userID || !password) {
            res.status(400).json({ message: 'userID and password are required.' });
            return;
        }

        // hier den aufruf der Service Ebene.
        const createdUser = await createUserService({
            userID,
            firstName,
            lastName,
            isAdministrator,
            password
        });

        // Erfolgreich angelegt
        res.status(201).json({
            message: 'User created successfully.',
            user: createdUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// search by ID
app.get('/api/publicUsers/:userID', async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = parseInt(req.params.userID, 10);

        const user = await findUserByIdService(userID);

        res.status(200).json({
            user: {
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdministrator: user.isAdministrator
            }
        });
    } catch (error) {
        console.error('Error searching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// read all
app.get('/api/publicUsers', async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await findAllUsersService();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// update
app.put('/api/publicUsers/:userID', async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = parseInt(req.params.userID, 10);
        const updateData = req.body;

        const updatedUser = await updateUserService(userID, updateData);

        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error: any) {
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found.' });
        } else {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// delete
app.delete('/api/publicUsers/:userID', async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = parseInt(req.params.userID, 10);

        const deletedUser = await deleteUserService(userID);

        res.status(200).json({
            message: 'User deleted successfully.',
            user: deletedUser
        });
    } catch (error: any) {
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found.' });
        } else {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


// Server starten
const server: Server = app.listen(3000, ():void => {
    console.log(`Server running at http://localhost:3000`);
});

//Mongodb Verbindung aufbauen
mongoose.connect("mongodb://localhost:27017").then((): void => {
    console.log("MongoDB connected");
}).catch((e: Error): void => {
    console.log("Connection failed");
})

