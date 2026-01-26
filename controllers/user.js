const {v4: uuidv4} = require("uuid")
const user = require('../models/user');
const {setUser} = require("../service/auth");

async function handleUserSignup(req,res){
    const {username,email,password} = req.body;
    await user.create({
        username,
        email,
        password,
    }); 
    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const {username,email,password} = req.body;
    const userData = await user.findOne({email,password,}); 
    if(!userData)
        return res.render("login",{
            error: "Invalid Credentials",
        });
    const token = setUser (userData);
    res.cookie('uid',token);
    return res.redirect("/");
}

module.exports = {handleUserSignup, handleUserLogin};