const express = require('express');
const router = express.Router();
const { addMovie , getMovie } = require('../controllers/movie.controller');
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , "./images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

router.post('/add' , upload.single('poster') , (req , res) => {console.log(req.file); addMovie(req , res)});
router.get('/' , getMovie);
router.get('/:id' , getMovie);
router.put('/:id/edit' , (req , res) => {});
router.delete('/:id/delete' , (req , res) => {});

module.exports = router