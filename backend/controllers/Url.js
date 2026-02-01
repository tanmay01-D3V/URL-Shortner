const shortID = require('shortid')
const URL = require("../models/url")

async function handlegenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const shortIDValue = shortID.generate();
    await URL.create({
        shortID: shortIDValue,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.json({ id: shortIDValue });
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortId;
    const result = await URL.findOne({ shortID });
    return res.json({
        TotalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

async function handleGetAllUrls(req, res) {
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.json({ urls: allUrls });
}

module.exports = {
    handlegenerateNewShortURL,
    handleGetAnalytics,
    handleGetAllUrls,
}