import { UserModel } from './UserModel';
import { IUser } from "./UserModel";

// create
export async function createUserService(data: {
    userID: number;
    firstName?: string;
    lastName?: string;
    isAdministrator?: boolean;
    password: string;
}) {
    const { userID, password } = data;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ userID });
    if (existingUser) {
        throw new Error('UserAlreadyExists');
    }

    // Create new user (password gets hashed via Mongoose hook)
    const newUser = new UserModel(data);
    const savedUser = await newUser.save();

    return {
        userID: savedUser.userID,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        isAdministrator: savedUser.isAdministrator
    };
}

// search by ID
export async function findUserByIdService(userID: number) {
    if (isNaN(userID)) throw new Error('InvalidUserID');

    const user = await UserModel.findOne({ userID });

    if (!user) throw new Error('UserNotFound');

    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    };
}

// read all
export async function findAllUsersService() {
    const users = await UserModel.find();

    return users.map(user => ({
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    }));
}

// update
export async function updateUserService(userID: number, updateData: Partial<IUser>) {
    const user = await UserModel.findOneAndUpdate({ userID }, updateData, {
        new: true,
        runValidators: true
    });

    if (!user) throw new Error('UserNotFound');

    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    };
}

// delete
export async function deleteUserService(userID: number) {
    const user = await UserModel.findOneAndDelete({ userID });

    if (!user) throw new Error('UserNotFound');

    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName
    };
}
