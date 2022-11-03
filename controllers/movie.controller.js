const dbConfig = require('../database/init-db');

const addMovie = async (req , res) => {
    const name = JSON.parse(req.body.movieData).name;
    const year_of_release = JSON.parse(req.body.movieData).year_of_release;
    const plot = JSON.parse(req.body.movieData).plot;
    const poster = req.file.path;
    const actor_ids = JSON.parse(req.body.movieData).actors;
    const producer_id = JSON.parse(req.body.movieData).producer;

    console.log(req.body);

    actor_ids.forEach(async (actor_id) => {
        const checking_actor = await dbConfig.crew.findOne({where: {id: actor_id}});
        if(checking_actor.dataValues.role == 'PRODUCER'){
            res.status(400);
            return res.json({
                "message": "Your Actors can't be producers in this system."
            });
        }
    });

    const checking_producer = await dbConfig.crew.findOne({where: {id: producer_id}});
    if(checking_producer.dataValues.role == 'ACTOR'){
        res.status(400);
        return res.json({
            "message": "Your producers can't be actor in this system."
        });
    }

    try {

        const newMovie = await dbConfig.movie.create({name: name , year_of_release: year_of_release , plot: plot , poster: poster, producer_id: producer_id});
        //console.log(newMovie)
        actor_ids.forEach(async (actor_id) => {
            const actor = await dbConfig.crew.findOne({where: {id: actor_id}});
            newMovie.addCrew(actor);
        });
        res.status(200);
        return res.json({
            "message": "Movie created successfully!",
            "data": newMovie
        });
    } catch(e){
        res.status(500);
        return res.json({
            'message': "Internal Server Error",
            'member': e.errors[0].message
        });
    }
}

const getMovie = async (req , res) => {
    const movie_id = req.params.id;
    if(movie_id) {
        try {
            const movie = await dbConfig.movie.findOne({where: {id: movie_id} , include: [{model: dbConfig.crew, as: dbConfig.crew.role}]})
            const producer = await dbConfig.crew.findOne({where: {id: movie.dataValues.producer_id}});
            res.status(200);
            return res.json({
                "message": "Successfully got the movie",
                "data": movie,
                "producer": producer
            });
        } catch(e) {
            res.status(500);
            return res.json({
                "message": "Error fetching movie",
                "error": e.toString() 
            });
        }
    } else {
        try {
            const movie = await dbConfig.movie.findAll({ include: [{model: dbConfig.crew, as: dbConfig.crew.role}]})
            //const producer = await dbConfig.crew.findOne({where: {id: movie.dataValues.producer_id}});
            res.status(200);
            return res.json({
                "message": "Successfully got the movie",
                "data": movie
            });
        } catch(e) {
            res.status(500);
            return res.json({
                "message": "Error fetching movie",
                "error": e.toString() 
            });
        }
    }
}

module.exports = { addMovie , getMovie }

