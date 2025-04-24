import express, { Express } from "express";
import { Server } from 'http';
import mongoose from "mongoose";
import { publicUserRouter } from './endpoints/user/publicUsersRoute.js';

const app: Express = express();     // erzeugt Express App und konfiguriert Web Server.
app.use(express.json());            // body parser middleware (json -> req.body), sonst bei post und put undefined.

// alle anfragen die mit prefix beginnen werden an den router weitergeleitet.
// benutzt die Routen.
app.use('/api/publicUsers', publicUserRouter);

// Server starten
const server: Server = app.listen(80, ():void => {
    console.log(`Server running at http://127.0.0.1:80`);
});

//Mongodb Verbindung aufbauen
mongoose.connect("mongodb://localhost:27017").then((): void => {
    console.log("MongoDB connected");
}).catch((e: Error): void => {
    console.log("Connection failed");
})

