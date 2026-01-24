const express = require("express");
const {handlegenerateNewShortURL, handleGetAnalytics} = require("../controllers/Url");
const URL = require("../models/url");

const router = express.Router();

router.post("/", handlegenerateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics);

router.get("/:shortId", async (req, res) => {
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortID,
    }, 
    { 
        $push: { 
            visitHistory: {timestamp: Date.now(),},
        },
    }   
    );
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL);
});

module.exports = router;