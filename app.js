const express = require('express');
const app = express();
const database = require('./database/init-db')
const cors = require('cors');
const crewRoutes = require('./routes/crew.route');
const movieRoutes = require('./routes/movie.route');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(express.json());
app.use(cors());

database.sequelize.sync({force: false}).then(() => {
    console.log('Database is up!');
});

app.use('/crew' , crewRoutes);
app.use('/movie' , movieRoutes);

app.get('/' , (req , res) => {
    res.status(200).json({
        "message": 'Hello World'
    })

});

app.listen(8000 , () => {
    console.log('Server running on localhost post 8000');
});