import express from "express";
import mongoose from "mongoose";
import { publicUserRouter } from './endpoints/user/publicUsersRoute.js';
const app = express(); // erzeugt Express App und konfiguriert Web Server.
app.use(express.json()); // body parser middleware (json -> req.body), sonst bei post und put undefined.
// alle anfragen die mit prefix beginnen werden an den router weitergeleitet.
// benutzt die Routen.
app.use('/api/publicUsers', publicUserRouter);
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