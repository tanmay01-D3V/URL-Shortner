const express = require ("express");
const Path = require ("path");
const StaticRouter = require ("./Routes/StaticRouter");
const connectMongoDB = require("./connection");
const urlRoute = require("./Routes/Url");
const URL = require ("./models/url");
const app = express();
const PORT = 8003;

connectMongoDB("mongodb://localhost:27017/").then(() => console.log("mongoDb connected"))


app.set ("view engine", "ejs");
app.set ("views",Path.resolve("./views"));

app.use (express.json());
app.use(express.urlencoded({extended:true}));

app.get ("/test", async (req, res) => {
    const allUrls = await URL.find ({});
    return res.render("home",{urls: allUrls,    
    });
});

app.use ("/url", urlRoute);
app.use ("/", StaticRouter);
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
