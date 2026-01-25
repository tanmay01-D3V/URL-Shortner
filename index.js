const express = require ("express");
const Path = require ("path");
const cookieParser = require ("cookie-parser");
const connectMongoDB = require("./connection");
const {restrictToLoggedInUsersOnly, checkAuth } = require("./middlewares/auth");
const URL = require ("./models/url");

const urlRoute = require("./Routes/Url");
const StaticRouter = require ("./Routes/StaticRouter");
const userRoute = require("./Routes/user");

const app = express();
const PORT = 8003;

connectMongoDB("mongodb://localhost:27017/").then(() => console.log("mongoDb connected"))


app.set ("view engine", "ejs");
app.set ("views",Path.resolve("./views"));

app.use (express.json());
app.use(express.urlencoded({extended:true}));
app.use (cookieParser());

app.get ("/test", async (req, res) => {
    const allUrls = await URL.find ({});
    return res.render("home",{urls: allUrls,    
    });
});

app.use ("/url", urlRoute);
app.use ("/user", userRoute);
app.use ("/",  checkAuth, StaticRouter);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
