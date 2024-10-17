const User = require('../../model/user');  // Adjust path according to your project structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET;


let verificationCodes = {};

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,  
    port: process.env.MAILTRAP_PORT, 
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS 
    }
});

// Function to send email with the verification code
const sendVerificationEmail = async (userEmail, verificationCode) => {
    const mailOptions = {
        from: '"Your App" <no-reply@yourapp.com>',  // Sender address
        to: userEmail, 
        subject: 'Your Verification Code',
        text: `Your verification code is: ${verificationCode}`,
        html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required!" });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials!" });
        }

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Store the verification code (in memory or a DB)
        verificationCodes[user._id] = verificationCode;

        // Send verification code via email
        await sendVerificationEmail(user.email, verificationCode);

        res.status(200).send({ message: 'Verification code sent to your email!', userId: user._id });

    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred during login." });
    }
};

// Verify the code and complete login
exports.verifyCodeAndLogin = async (req, res) => {
    const { userId, code } = req.body;

    if (!userId || !code) {
        return res.status(400).send({ message: "User ID and code are required!" });
    }

    try {
        // Check if the code matches
        if (verificationCodes[userId] !== code) {
            return res.status(400).send({ message: "Invalid verification code!" });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: '1h'  // Token expires in 1 hour
        });

        // Optionally delete the verification code after successful verification
        delete verificationCodes[userId];

        // Respond with token and user info
        res.status(200).send({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred during verification." });
    }
};