import { UserModel } from './UserModel.js';
import { IUser } from "./UserModel.js";
import { CreateUserDto } from "./../../types/UserDTO.js";

// create
export async function createUserService( data: CreateUserDto ) {
    // object destructuring
    const { userID, password } = data;

    // prüft ob ein User bereits existiert.
    const existingUser = await UserModel.findOne({ userID });

    // benuter existiert bereits.
    if (existingUser) throw new Error('UserAlreadyExists');

    // aufruf UserModel mit den übergebenen Inhalten aus dem request um neuen User zu erstellen.
    // password wird automatisch im schema ge hashed mit einem Mongoose hook pre('save')
    const newUser = new UserModel(data);
    const savedUser = await newUser.save();

    // erstellter User wird zurückgegeben
    return {
        userID: savedUser.userID,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        isAdministrator: savedUser.isAdministrator
    };
}

// search by ID
export async function findUserByIdService(userID: number) {
    // simple validierung prüft ob eine zahl vorliegt
    if (isNaN(userID)) throw new Error('InvalidUserID');

    // aufruf auf das UserModel um einen user mit einer ID zu finden.
    const user = await UserModel.findOne({ userID });

    // Error wenn User nicht gefunden wurde.
    if (!user) throw new Error('UserNotFound');

    // User wiedergeben.
    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    };
}

// read all
export async function findAllUsersService() {

    // aufruf UserModel um alle einträge abzurufen.
    const users = await UserModel.find();

    // user in einer Liste wiedergeben.
    return users.map(user => ({
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    }));
}

// update
// updateData kann einige oder alle Felder enthalten
export async function updateUserService(userID: number, updateData: Partial<IUser>) {
    // aufruf vom UserModel um einen User mit der bestimmten ID zu bearbeiten mit einem übergebenen Inhalt aus dem req
    const user = await UserModel.findOneAndUpdate({ userID }, updateData, {
        new: true,  // gibt den neuen datensatz zurück nicht den alten.
        runValidators: true // wendet alle mongoose validierungen auf alle Änderungen an.
    });

    // wenn der User mit der ID nicht existiert dann Error.
    if (!user) throw new Error('UserNotFound');

    // gibt den bearbeiteten User zurück.
    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator
    };
}

// delete
export async function deleteUserService(userID: number) {
    // aufruf UserModel um einen User mit einer bestimmten ID zu finden und zu löschen.
    const user = await UserModel.findOneAndDelete({ userID });

    // wenn der User nicht existiert dann Error.
    if (!user) throw new Error('UserNotFound');

    // gibt gelöschten User zurück.
    return {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName
    };
}
