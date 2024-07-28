const express = require("express");
const router = express.Router();
const authMiddleware = require("./middleware/authMiddleware");

const register = require("./controllers/register");
const login = require("./controllers/login");
const logout = require("./controllers/logout");
const createToDo = require("./controllers/createToDo");
const getToDo = require("./controllers/getToDo");
const updateToDo = require("./controllers/updateToDo");
const deleteToDo = require("./controllers/deleteToDo");
const getSession = require("./controllers/getSession");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.post("/todos", authMiddleware, createToDo);

router.get("/todos", authMiddleware, getToDo);

router.put("/todos/:id", authMiddleware, updateToDo);

router.delete("/todos/:id", authMiddleware, deleteToDo);

router.get("/sessions", authMiddleware, getSession);

module.exports = router;
