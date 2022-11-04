const express = require('express');
const router = express.Router();

const { registerAdmin , login} = require('../controllers/admin.controller');

router.post('/register' , registerAdmin);
router.post('/login' , login);

module.exports = router;