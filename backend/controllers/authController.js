const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ email, passwordHash });
        await newUser.save();

        res.status(201).json({ message: 'User Registered Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
};

// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         // Log the user object for debugging
//         console.log(user); // Check if user.passwordHash exists

//         // Check if the passwordHash field is available
//         if (!user.passwordHash) {
//             return res.status(400).json({ message: "Password hash not found for the user" });
//         }

//         // Compare the entered password with the hashed password
//         const isMatch = await bcrypt.compare(password, user.passwordHash);

//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate a JWT or handle the login flow (this depends on your app logic)
//         res.status(200).json({ message: "Login successful" });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };