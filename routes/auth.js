const express = require("express");
const { register, login, logout } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/api/register", register);

authRouter.post("/api/login", login);

authRouter.post("/api/logout", logout);

module.exports = { authRouter };
