const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET;


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if Authorization header is present and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send({ message: "No token provided!" });
    }

    // Extract token from the 'Bearer <token>' format
    const token = authHeader.split(' ')[1];

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        // Attach decoded token (user information) to the request object
        req.user = decoded;
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
