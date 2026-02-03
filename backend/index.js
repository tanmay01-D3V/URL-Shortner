require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./connection");
const { restrictToLoggedInUsersOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");


const cors = require("cors");


const urlRoute = require("./Routes/Url");
const StaticRouter = require("./Routes/StaticRouter");
const userRoute = require("./Routes/user");

const app = express();
const PORT = process.env.PORT || 8003;

connectMongoDB(process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortener").then(() => console.log("mongoDb connected"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/api/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.json({ urls: allUrls });
});

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/url", urlRoute);
app.use("/api/user", userRoute);

// Handle React routing, return all requests to React app
app.get(/.*/, (req, res) => {
    // Check if it's an API route that wasn't handled
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "API endpoint not found" });
    }
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
