const { v4: uuidv4 } = require("uuid")
const user = require('../models/user');
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;
    try {
        await user.create({
            username,
            email,
            password,
        });
        return res.status(201).json({ status: 'success', message: 'User created successfully' });
    } catch (error) {
        return res.status(400).json({ status: 'error', error: error.message });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const userData = await user.findOne({ email, password });
        if (!userData)
            return res.status(401).json({
                status: 'error',
                error: "Invalid Credentials",
            });

        const token = setUser(userData);
        res.cookie('uid', token);
        return res.json({
            status: 'success',
            token,
            user: {
                id: userData._id,
                username: userData.username,
                email: userData.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: 'error', error: 'Server error. Please try again.' });
    }
}

module.exports = { handleUserSignup, handleUserLogin };