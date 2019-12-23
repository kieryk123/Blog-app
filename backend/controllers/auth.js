const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const { email, name, password } = req.body;

    bcrypt.hash(password, 12)
        .then(hashedPass => {
            const user = new User({
                email,
                password: hashedPass,
                name
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'Successfuly created your account! You can login now.', userId: result._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let loadedUser;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                const error = new Error('User with this email not found!')
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!')
                error.statusCode = 401;
                throw error;
            }

            const { email, _id, name } = loadedUser;
            const token = jwt.sign({
                    email,
                    userId: _id.toString()
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Logged in succesfully!', name, token, userId: _id.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
