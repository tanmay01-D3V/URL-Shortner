const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique: true,
    },
    redirectURL:{
        type: String,
        requird:true,
        unique:true,
    },
    visitHistory: [{ timestamp: {type: Number}}],
    createdDate: [{ type: Number, default: Date.now }],
    Updateddate: [{ type: Number, default: Date.now }],
    },
    {timestamp: true}
);

const URL = mongoose.model("Url", urlSchema);
module.exports = URL;