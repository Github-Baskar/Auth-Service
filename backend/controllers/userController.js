import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc        Auth user/set token
// route        POST /api/users/auth
// @access      Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        if (user.authType === 'password' && await user.matchPassword(password)) {
            generateToken(res, user._id)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else if (user.authType === 'oauth') {
            generateToken(res, user._id)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }
});

// @desc        Register a new user
// route        POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, authType } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
        authType,
    });
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc        Logout user
// route        POST /api/users/logout
// @access      Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
});

// @desc        Get user list
// route        GET /api/users
// @access      Private
const getUserList = asyncHandler(async (req, res) => {
    const usersList = await User.find({}, {
        _id: 1,
        name: 1,
        authType: 1,
        createdAt: 1,
    });
    if (Array.isArray(usersList) && usersList.length > 0) {
        res.status(200).json({
            message: '',
            data: usersList
        });
    } else {
        res.status(204);
        throw new Error('No records.')
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserList,
};