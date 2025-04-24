"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = createUserService;
exports.findUserByIdService = findUserByIdService;
exports.findAllUsersService = findAllUsersService;
exports.updateUserService = updateUserService;
exports.deleteUserService = deleteUserService;
const UserModel_1 = require("./UserModel");
// create
async function createUserService(data) {
    const { userID, password } = data;
    // Check if user already exists
    const existingUser = await UserModel_1.UserModel.findOne({ userID });
    if (existingUser) {
        throw new Error('UserAlreadyExists');
    }
    // Create new user (password gets hashed via Mongoose hook)
    const newUser = new UserModel_1.UserModel(data);
    const savedUser = await newUser.save();
    return {
        userID: savedUser.userID,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        isAdministrator: savedUser.isAdministrator
    };
}
// search by ID
async function findUserByIdService(userID) {
    if (isNaN(userID))
        throw new Error('InvalidUserID');
    const user = await UserModel_1.UserModel.findOne({ userID });
    if (!user)
        throw new Error('UserNotFound');
    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    };
}
// read all
async function findAllUsersService() {
    const users = await UserModel_1.UserModel.find();
    return users.map(user => ({
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    }));
}
// update
async function updateUserService(userID, updateData) {
    const user = await UserModel_1.UserModel.findOneAndUpdate({ userID }, updateData, {
        new: true,
        runValidators: true
    });
    if (!user)
        throw new Error('UserNotFound');
    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    };
}
// delete
async function deleteUserService(userID) {
    const user = await UserModel_1.UserModel.findOneAndDelete({ userID });
    if (!user)
        throw new Error('UserNotFound');
    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName
    };
}
//# sourceMappingURL=UserService.js.map