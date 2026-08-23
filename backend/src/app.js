import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManegar.js"

import cors from "cors";
import userRoutes from "./routes/users.routes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);




app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb"}));
app.use(express.urlencoded({ limit : "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://bitukumar4220_db_user:Bittu900@cluster0.uyjmhqi.mongodb.net/?appName=Cluster0")

    console.log(`MONGO Connect DB Host : ${connectionDb.connection.host}`)
    server.listen(app.get("port"), ()=>{
        console.log("Listemin on port 8000")
    });
}

start();