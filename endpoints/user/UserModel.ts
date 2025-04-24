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
// mongoose middleware hook -> wird automatisch ausgeführt bevor ein Dokument angelegt wird (.pre('save'..))
UserSchema.pre<IUser>('save', async function (next) {
    // this -> aktuelles mongoose dokument.
    // isModified -> ob das passwort geändert wurde.
    // return next() -> überspringt die middleware falls unverändert.
    if (!this.isModified('password')) return next();

    try {
        // erstellt zufälliges salt für das hashing, (10) -> salt rundenanzahl.
        const salt = await bcrypt.genSalt(10);

        // klartext password wird sicher gehasht,
        // vorheriges password (this.password) wird ersetzt mit dem hash
        this.password = await bcrypt.hash(this.password, salt);

        // ruft nächste middleware auf, wichtig bei hooks
        return next();
    } catch (err) {
        // fängt fehler beim hashing ab
        return next(err as Error);
    }
});

// erstellt konkretes mongoose model basierend auf dem schema.
export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
