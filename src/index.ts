import "dotenv/config";
import express from "express";
import config from "./config/appConfig";
 

const app = express();

app.listen(config.PORT, async () => {
     
    console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  });
 