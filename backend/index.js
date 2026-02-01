const express = require("express");
const Path = require("path");
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./connection");
const { restrictToLoggedInUsersOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");


const cors = require("cors");


const urlRoute = require("./Routes/Url");
const StaticRouter = require("./Routes/StaticRouter");
const userRoute = require("./Routes/user");

const app = express();
const PORT = 8003;

connectMongoDB("mongodb://localhost:27017/").then(() => console.log("mongoDb connected"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/api/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.json({ urls: allUrls });
});

app.use("/api/url", urlRoute);
app.use("/api/user", userRoute);

// Keep the root route for health check or redirect if needed, 
// but primarily we want the API to be under /api
app.get("/", (req, res) => {
    res.json({ message: "URL Shortener API is running" });
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
