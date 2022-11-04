const { Sequelize, DataTypes } = require('sequelize');
const crew = require('../models/crew.model');
const movie = require('../models/movie.model');

var sequelize = new Sequelize(
    "imdb-database",
    'vaibhav',
    'vaibhav@imdb',
    {
        storage: "./database/db.sqlite",
        dialect: "sqlite",
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);

const dbConfig = {}

dbConfig.sequelize = sequelize;
dbConfig.crew = crew(sequelize , DataTypes);
dbConfig.movie = movie(sequelize , DataTypes);

const actors_movies = sequelize.define('actors_movies' , {} , {timestamps: false});

dbConfig.crew.belongsToMany(dbConfig.movie , {through: actors_movies , as: 'movies'});
dbConfig.movie.belongsToMany(dbConfig.crew , {through: actors_movies , as: 'actors'});
dbConfig.movie.belongsTo(dbConfig.crew , {foreignKey: 'producer_id' , as: "producer"});

module.exports = dbConfig;

