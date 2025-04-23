import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

//Typescript Interface
export interface IUser extends Document {
    userID: number;
    firstName?: string;
    lastName?: string;
    isAdministrator: boolean;
    password: string;
}

const UserSchema: Schema = new Schema<IUser>({
        userID: {
            type: Number,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: true,
        },
        isAdministrator: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: true,
        }
});

// password hashing middleware
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err as Error);
    }
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
