const express = require ("express");
const connectMongoDB = require("./connection");
const urlRoute = require("./Routes/Url");
const URL = require ("./models/url");
const app = express();
const PORT = 8003;

connectMongoDB("mongodb://localhost:27017/").then(() => console.log("mongoDb connected"))

app.use (express.json());
app.use ("/", urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
