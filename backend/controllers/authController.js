const bcrypt = require("bcryptjs");
const db = require("../config/db");
const generateToken = require("../utils/generateToken");

// Register
exports.registerUser = async (req, res) => {

    console.log("REQ BODY:", req.body);

    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, results) => {

            if (results.length > 0) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            const hashedPassword =
                await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users(fullname,email,password) VALUES(?,?,?)",
                [fullname, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: "User Registered Successfully"
                    });
                }
            );
        }
    );
};

// Login
exports.loginUser = (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, results) => {

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid Email"
                });
            }

            const user = results[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }

            res.status(200).json({
                token: generateToken(user.id),
                user: {
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email
                }
            });
        }
    );
};

// Logout
exports.logoutUser = (req, res) => {
    res.status(200).json({
        message: "Logout Successful"
    });
};