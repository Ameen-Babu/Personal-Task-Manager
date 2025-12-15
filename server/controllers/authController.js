const jwt = require('jsonwebtoken');
const User = require('../models/User');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }


    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }


    const user = await User.create({
        username,
        email,
        password,
    });

    if (user) {
        console.log('User created:', user._id);
        const token = generateToken(user._id);
        console.log('Generated token:', token);

        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: token,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (user && (user.password === password)) {
        console.log('Login successful for:', user.email);
        const token = generateToken(user._id);
        console.log('Login Token:', token);

        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: token,
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
};
