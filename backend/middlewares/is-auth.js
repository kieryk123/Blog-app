const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('Not authenticated!');
        res.status(401).json({ message: 'Not authenticated!' });
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        err.statusCode = 500;
        err.message = 'Server error. Try again later.';
        throw err;
    }

    if (!decodedToken) {
        const error = new Error('Not authenticated!');
        res.status(401).json({ message: 'Not authenticated!' });
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
};
