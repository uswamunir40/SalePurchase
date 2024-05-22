import "dotenv/config";
import express from "express";
import { connectDB } from "./db/config.js";
import syncDb from "./db/init.js"
import allRoutes from "./routes/index.js";
connectDB();
syncDb().then(() => {
    console.log("Models created");
})


const app = express();
app.use(express.json());



app.use(allRoutes);



app.listen(3000, () => {
    console.log("server is running at port 3000");


});