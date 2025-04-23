import express, { Express } from "express";
import { Server } from 'http';
import mongoose from "mongoose";
import { userRouter } from './endpoints/user/UserRoute';

const app: Express = express();
app.use(express.json());

// ✅ Mounten der Routing-Datei unter dem Prefix
app.use('/api/publicUsers', userRouter);

// Server starten
const server: Server = app.listen(3000, ():void => {
    console.log(`Server running at http://localhost:3000`);
});

//Mongodb Verbindung aufbauen
mongoose.connect("mongodb://localhost:27017").then((): void => {
    console.log("MongoDB connected");
}).catch((e: Error): void => {
    console.log("Connection failed");
})

