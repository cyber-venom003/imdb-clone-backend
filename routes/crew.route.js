const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const {addCrewMember, viewCrewMember} = require('../controllers/crew.controller');

router.post('/add' , protect , addCrewMember);
router.get('/:id' , viewCrewMember);
router.get('/' , viewCrewMember);

module.exports = router