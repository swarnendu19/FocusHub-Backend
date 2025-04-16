import "dotenv/config";
import express from "express";
import config from "./config/appConfig";
import { initializeDatabase } from "./database/db";
 

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(config.PORT, async () => {
    await initializeDatabase();
    console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  });
 