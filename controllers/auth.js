const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');
const User = require('../models/User');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    });
    if (candidate) {
        // check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            // generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {
                expiresIn: 60 * 60
            });

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Wrong password'
            });
        }
    } else {
        res.status(404).json({
            message: 'Email does not exist'
        });
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    });
    if (candidate) {
        res.status(409).json({
            message: 'Email exists'
        });
    } else {
        // register
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
};
