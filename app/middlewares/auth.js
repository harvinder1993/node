const jwt = require('jsonwebtoken');
require('dotenv').config();
// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET;


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
       
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.user = decoded; 
        next();
    });
};

module.exports = authenticateToken;
