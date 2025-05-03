const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
// This code defines the authentication routes for user registration and login in an Express application. It imports the necessary modules, sets up the router, and defines two POST routes: one for user registration and another for user login. The routes are linked to their respective controller functions, which handle the logic for each operation. Finally, the router is exported for use in other parts of the application.