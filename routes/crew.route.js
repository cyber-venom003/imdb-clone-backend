const express = require('express');
const router = express.Router();

const {addCrewMember, viewCrewMember} = require('../controllers/crew.controller');

router.post('/add' , addCrewMember);
router.get('/:id' , viewCrewMember);
router.get('/' , viewCrewMember);

module.exports = router