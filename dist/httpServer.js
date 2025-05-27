import express from "express";
import https from 'https';
import mongoose from "mongoose";
import { publicUserRouter } from './endpoints/user/publicUsersRoute.js';
import { UserModel } from './endpoints/user/UserModel.js';
import bcrypt from 'bcryptjs';
import authRoute from './endpoints/authentication/AuthenticationRoute.js';
import { privateUserRouter } from './endpoints/user/privateUsersRoute.js';
import { degreeCourseRouter } from "./endpoints/degreeCourse/DegreeCourseRoute.js";
import degreeCourseApplicationRoutes from "./endpoints/degreeCourse/DegreeCourseApplicationRoutes.js";
import abnahmeRoute from './endpoints/abnahme/abnahmeRoute.js';
import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
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
// degreeCourse route
app.use('/api/degreeCourses', degreeCourseRouter);
// degreeCourseApplication
app.use('/api/degreeCourseApplications', degreeCourseApplicationRoutes);
// abnahme 1
app.use('/api/abnahme', abnahmeRoute);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem')),
};
// HTTPS-Server starten
https.createServer(sslOptions, app).listen(443, () => {
    console.log('HTTPS Server läuft auf https://localhost:443');
});
// Server starten
// const server: Server = app.listen(80, ():void => {
//    console.log(`Server running at http://127.0.0.1:80`);
// });
//Mongodb Verbindung aufbauen
mongoose.connect("mongodb://localhost:27017").then(() => {
    console.log("MongoDB connected");
}).catch((e) => {
    console.log("Connection failed");
});
//# sourceMappingURL=httpServer.js.map