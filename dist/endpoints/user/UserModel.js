import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new Schema({
    userID: {
        type: String,
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
UserSchema.pre('save', async function (next) {
    // this -> aktuelles mongoose dokument.
    // isModified -> ob das passwort geändert wurde.
    // return next() -> überspringt die middleware falls unverändert.
    if (!this.isModified('password'))
        return next();
    try {
        // erstellt zufälliges salt für das hashing, (10) -> salt rundenanzahl.
        const salt = await bcrypt.genSalt(10);
        // klartext password wird sicher gehasht,
        // vorheriges password (this.password) wird ersetzt mit dem hash
        this.password = await bcrypt.hash(this.password, salt);
        // ruft nächste middleware auf, wichtig bei hooks
        return next();
    }
    catch (err) {
        // fängt fehler beim hashing ab
        return next(err);
    }
});
// erstellt konkretes mongoose model basierend auf dem schema.
export const UserModel = mongoose.model('User', UserSchema);
//# sourceMappingURL=UserModel.js.map