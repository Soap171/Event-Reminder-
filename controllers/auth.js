const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  const saltRounds = 10;

  try {
    const hashpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      phone,
      password: hashpassword,
    });
    await newUser.save();
    if (!newUser) return res.sendStatus(400);

    res.status(201).json("New user created");
  } catch (err) {
    console.log(err);
  }
};

// log a user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json("wrong password");

    const token = jwt.sign({ id: user._id }, "jwtkey", { expiresIn: "1h" });

    // Send response with the token and user details (excluding password)
    const { password: _, ...userDetails } = user.toObject();

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })
      .status(200)
      .json(userDetails);
  } catch (err) {
    console.log(err);
  }
};

// logout a user
const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("user logged out");
};

module.exports = { register, login, logout };
