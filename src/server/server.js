const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const { isMongooseEnabled } = require("../config/SERVER");

//use .env file for process level config
config({
  path: "../../.env",
});


const MongoDBMiddleWare = require("./middlewares/MongoDBMiddleWare");
const FileBasedDBMiddleware = require("./middlewares/FileBasedDBMiddleware");
const ConfigurationMiddleware = require("./middlewares/ConfigurationMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT;

app.use("/", ConfigurationMiddleware)

if (isMongooseEnabled) app.use("/", MongoDBMiddleWare);
else app.use("/", FileBasedDBMiddleware);

app.listen(PORT, () => {
  console.log(`Started server at http://localhost:${PORT}.`);
});
