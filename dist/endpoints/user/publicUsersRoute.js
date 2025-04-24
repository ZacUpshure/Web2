import express from 'express';
import { createUserService, deleteUserService, findAllUsersService, findUserByIdService, updateUserService } from './UserService.js';
// erzeugt eigene Routing instanz unabhängig vom hauptserver -> modularität GET/POST/...
// z.B. publicUserRouter.post(...
export const publicUserRouter = express.Router();
// CREATE
// Typen in Request<Params, ResBody, ReqBody>
publicUserRouter.post('/', async (req, res) => {
    try {
        // Objekt destructuring: Einzelen Felder aus einem Objekt extrahieren.
        const { userID, firstName, lastName, isAdministrator, password } = req.body;
        // prüft ob userID und password vorhanden ist.
        if (!userID || !password) {
            res.status(400).json({ message: 'userID and password are required.' });
            return;
        }
        // erstellt User mit mit req.Body und ruft Service auf.
        const createdUser = await createUserService({
            userID,
            firstName,
            lastName,
            isAdministrator,
            password
        });
        // sendet antwort bei erfolgreicher erstellung. Ansonsten eine Fehlermeldung.
        res.status(201).json({ message: 'User created successfully.', ...createdUser });
    }
    catch (error) {
        if (error.message === 'UserAlreadyExists') {
            res.status(409).json({ message: 'User already exists.' });
        }
        else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});
// READ ALL
publicUserRouter.get('/', async (_req, res) => {
    try {
        // aufruf Service um alle Nutzer abzurufen.
        const users = await findAllUsersService();
        // wenn korrekt werden alle User zurückgegeben.
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error); // ansonsten error
        res.status(500).json([]);
    }
});
// READ BY ID
publicUserRouter.get('/:userID', async (req, res) => {
    try {
        // express liefert alle :params als string, daher parseInt(..) um benötigtes format zu bekommen.
        // fehler UserNotFound wird dadurch behandelt.
        const userID = req.params.userID;
        // aufruf Service um User per ID zu suchen.
        const user = await findUserByIdService(userID);
        // bei erfolg gibt es die Antwort mit statuscode und user als Json.
        res.status(200).json(user);
    }
    catch (error) { // error.
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});
// UPDATE
publicUserRouter.put('/:userID', async (req, res) => {
    try {
        // userID: string -> number
        const userID = req.params.userID;
        // aufruf Service um User mit bestimmter ID zu ändern mit den angaben aus dem Request body.
        const updatedUser = await updateUserService(userID, req.body);
        // response mit statuscode und message und geupdateter User.
        res.status(200).json({ message: 'User updated successfully.', ...updatedUser });
    }
    catch (error) { // error
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});
// DELETE
publicUserRouter.delete('/:userID', async (req, res) => {
    try {
        // userID: string -> number
        const userID = req.params.userID;
        // aufruf Service um User mit bestimmter ID zu löschen.
        const deletedUser = await deleteUserService(userID);
        // response 204 mit json message
        res.status(204).end();
    }
    catch (error) { // error
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});
//# sourceMappingURL=publicUsersRoute.js.map