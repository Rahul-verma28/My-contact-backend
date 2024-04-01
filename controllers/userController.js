const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

//@desc register a user
//@route post /api/contact/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("please fill out all the field");
    }

    const userAvaible = await Users.findOne({ email });
    if (userAvaible) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
        username, email, password: hashPassword
    });

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
})

//@desc login a user
//@route post /api/contact/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("please fill out all the field");
    }

    const user = await Users.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('Email or Password is incorrect');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECERT,
            {
                expiresIn: "15m"
            }
        )
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error('Email or Password is incorrect');
    }
})

//@desc get current user details
//@route post /api/contact/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = { registerUser, loginUser, currentUser };

