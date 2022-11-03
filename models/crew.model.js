const {Sequelize , DataTypes} = require('sequelize')

module.exports = (sequelize , DataTypes) => {
    const crew = sequelize.define('Crew' , {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['MALE', 'FEMALE', 'OTHERS']
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['ACTOR', 'PRODUCER']],
                    msg: "Must be ACTOR or PRODUCER"
                }
            }
        }
    } , {timestamps: false})
    return crew;
}