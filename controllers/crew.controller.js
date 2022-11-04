const { crew, movie } = require('../database/init-db');

const addCrewMember = async (req , res) => {
    const name = req.body.name;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const bio = req.body.bio;
    const role = req.body.role;

    try {
        const crewMember = await crew.create({name: name , gender: gender, dob: dob, bio: bio, role: role});
        res.status(201);
        return res.json({
            'message': "Crew Member Created Successfully!",
            'member': crewMember
        });
    } catch (e) {
        console.log(e)
        if (e.errors[0].type === 'Validation error'){
            res.status(400);
            return res.json({
                'message': "Bad Request",
                'member': e.errors[0].message
            });
        } else if(e.errors[0].type === 'notNull Violation') {
            res.status(400);
            return res.json({
                'message': "Bad Request",
                'member': e.errors[0].message
            });
        } else {
            res.status(500);
            return res.json({
                'message': "Internal Server Error",
                'member': e.errors[0].message
            });
        }
    }
}

const viewCrewMember = async (req , res) => {
    const id = req.params.id;
    if (id){
        try {
            const crewMember = await crew.findOne({where: {id: id} , include: {model: movie, as: 'movies'}});
            res.status(200);
            return res.json({
                'message': 'Crew Member fetched successfully!',
                'data': crewMember
            })
        } catch (e) {
            res.status(500);
            return res.json({
                'message': 'Internal Server Error',
                'error': e.toString()
            })
        }
    } else {
        try {
            const crewMembers = await crew.findAll({include: {model: movie, as: 'movies'}});
            res.status(200);
            return res.json({
                'message': 'Crew Member fetched successfully!',
                'data': crewMembers
            })
        } catch (e) {
            res.status(500);
            return res.json({
                'message': 'Internal Server Error',
                'error': e.toString()
            })
        }
    }
}

module.exports = {addCrewMember , viewCrewMember}