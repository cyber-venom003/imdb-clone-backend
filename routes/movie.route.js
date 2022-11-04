const express = require('express');
const router = express.Router();
const { addMovie , getMovie, editMovie, deleteMovie } = require('../controllers/movie.controller');
const { protect } = require('../middlewares/authMiddleware');
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

router.post('/add' , protect , upload.single('poster') , (req , res) => {console.log(req.file); addMovie(req , res)});
router.get('/' , getMovie);
router.get('/:id' , getMovie);
router.put('/:id/edit' , protect , upload.single('poster') ,editMovie);
router.delete('/:id/delete' , protect , deleteMovie);

module.exports = router