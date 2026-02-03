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

// Serve static files only in non-production environments
// Vercel handles static file serving through vercel.json
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

app.use("/api/url", urlRoute);
app.use("/api/user", userRoute);

// Handle React routing for local development
if (process.env.NODE_ENV !== 'production') {
    app.get(/.*/, (req, res) => {
        if (req.path.startsWith("/api")) {
            return res.status(404).json({ error: "API endpoint not found" });
        }
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
}

module.exports = app;
