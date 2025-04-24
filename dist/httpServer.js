"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoute_1 = require("./endpoints/user/UserRoute");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// ✅ Mounten der Routing-Datei unter dem Prefix
app.use('/api/publicUsers', UserRoute_1.userRouter);
// Server starten
const server = app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
//Mongodb Verbindung aufbauen
mongoose_1.default.connect("mongodb://localhost:27017").then(() => {
    console.log("MongoDB connected");
}).catch((e) => {
    console.log("Connection failed");
});
//# sourceMappingURL=httpServer.js.map