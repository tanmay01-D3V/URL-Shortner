const express = require("express");
const { handlegenerateNewShortURL, handleGetAnalytics, handleGetAllUrls } = require("../controllers/Url");
const { restrictToLoggedInUsersOnly } = require("../middlewares/auth");
const URL = require("../models/url");

const router = express.Router();

router.post("/", restrictToLoggedInUsersOnly, handlegenerateNewShortURL);

router.get("/", restrictToLoggedInUsersOnly, handleGetAllUrls);

router.get('/analytics/:shortId', restrictToLoggedInUsersOnly, handleGetAnalytics);

router.get("/:shortId", async (req, res) => {
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortID,
        },
        {
            $push: {
                visitHistory: { timestamp: Date.now(), },
            },
        }
    );
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL);
});

module.exports = router;