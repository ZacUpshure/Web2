import express from "express";
import mongoose from "mongoose";
import { publicUserRouter } from './endpoints/user/publicUsersRoute.js';
import { UserModel } from './endpoints/user/UserModel.js';
import bcrypt from 'bcryptjs';
import authRoute from './endpoints/authentication/AuthenticationRoute.js';
import { privateUserRouter } from './endpoints/user/privateUsersRoute.js';
const app = express(); // erzeugt Express App und konfiguriert Web Server.
app.use(express.json()); // body parser middleware (json -> req.body), sonst bei post und put undefined.
// erstellt Admin beim start des Servers:
const createAdminUser = async () => {
    const existingAdmin = await UserModel.findOne({ userID: 'admin' });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('123', 10);
        const adminUser = new UserModel({
            userID: 'admin',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            isAdministrator: true
        });
        await adminUser.save();
        console.log('Admin user created');
    }
};
createAdminUser();
// alle anfragen die mit prefix beginnen werden an den router weitergeleitet.
// benutzt die Routen.
app.use('/api/publicUsers', publicUserRouter);
// authentication route.
app.use('/api', authRoute);
// private user route
app.use('/api/users', privateUserRouter);
// Server starten
const server = app.listen(80, () => {
    console.log(`Server running at http://127.0.0.1:80`);
});
//Mongodb Verbindung aufbauen
mongoose.connect("mongodb://localhost:27017").then(() => {
    console.log("MongoDB connected");
}).catch((e) => {
    console.log("Connection failed");
});
//# sourceMappingURL=httpServer.js.map