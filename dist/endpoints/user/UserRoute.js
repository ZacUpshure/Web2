"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserService_1 = require("../user/UserService");
exports.userRouter = express_1.default.Router();
// CREATE
exports.userRouter.post('/', async (req, res) => {
    try {
        const { userID, firstName, lastName, isAdministrator, password } = req.body;
        if (!userID || !password) {
            res.status(400).json({ message: 'userID and password are required.' });
            return;
        }
        const createdUser = await (0, UserService_1.createUserService)({
            userID,
            firstName,
            lastName,
            isAdministrator,
            password
        });
        res.status(201).json({ message: 'User created successfully.', user: createdUser });
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
exports.userRouter.get('/', async (_req, res) => {
    try {
        const users = await (0, UserService_1.findAllUsersService)();
        res.status(200).json({ users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// READ BY ID
exports.userRouter.get('/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID, 10);
        const user = await (0, UserService_1.findUserByIdService)(userID);
        res.status(200).json({ user });
    }
    catch (error) {
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
exports.userRouter.put('/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID, 10);
        const updatedUser = await (0, UserService_1.updateUserService)(userID, req.body);
        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    }
    catch (error) {
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
exports.userRouter.delete('/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID, 10);
        const deletedUser = await (0, UserService_1.deleteUserService)(userID);
        res.status(200).json({ message: 'User deleted successfully.', user: deletedUser });
    }
    catch (error) {
        if (error.message === 'UserNotFound') {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});
//# sourceMappingURL=UserRoute.js.map